import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Trash2, Plus, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SERVICE_KEYS, SERVICE_LABELS, type ServiceKey } from "@/hooks/useServiceImages";

interface ServiceProperty {
  id: string;
  service_key: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

const PropertyImageManager = () => {
  const [properties, setProperties] = useState<ServiceProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<ServiceKey>("property-sales-rentals");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("service_properties")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setProperties(data as ServiceProperty[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProps = properties.filter((p) => p.service_key === activeService);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }

    setUploading(true);

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${activeService}/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("property-images")
      .upload(fileName, file, { upsert: true });

    if (uploadErr) {
      toast.error(`Upload failed: ${uploadErr.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(fileName);

    const { error: insertErr } = await supabase.from("service_properties").insert({
      service_key: activeService,
      title: title.trim() || "",
      image_url: urlData.publicUrl,
      display_order: filteredProps.length,
    });

    if (insertErr) {
      toast.error(`Failed to save: ${insertErr.message}`);
    } else {
      toast.success("Property image added!");
      setTitle("");
      await fetchProperties();
    }
    setUploading(false);
  };

  const handleDelete = async (prop: ServiceProperty) => {
    setDeletingId(prop.id);
    // Extract storage path from URL
    const urlParts = prop.image_url.split("/property-images/");
    if (urlParts.length > 1) {
      const path = decodeURIComponent(urlParts[1].split("?")[0]);
      await supabase.storage.from("property-images").remove([path]);
    }
    await supabase.from("service_properties").delete().eq("id", prop.id);
    toast.success("Property image removed.");
    await fetchProperties();
    setDeletingId(null);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Service selector */}
      <div className="flex flex-wrap gap-2">
        {SERVICE_KEYS.map((key) => {
          const count = properties.filter((p) => p.service_key === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveService(key)}
              className={`text-xs font-medium px-3 py-2 rounded transition-all duration-200 ${
                activeService === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {SERVICE_LABELS[key]} ({count})
            </button>
          );
        })}
      </div>

      {/* Upload form */}
      <div className="luxury-card p-4 sm:p-5">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Add Property Image — {SERVICE_LABELS[activeService]}
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Image title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {uploading ? (
              <><Loader2 size={14} className="animate-spin" /> Uploading...</>
            ) : (
              <><Plus size={14} /> Upload Image</>
            )}
          </button>
        </div>
      </div>

      {/* Property images grid */}
      {filteredProps.length === 0 ? (
        <div className="luxury-card p-12 text-center">
          <Upload size={36} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-light text-sm">
            No property images for this service yet. Upload one above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProps.map((prop) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="luxury-card overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={prop.image_url}
                  alt={prop.title || "Property"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(prop)}
                    disabled={deletingId === prop.id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-full bg-destructive/90 text-white flex items-center justify-center hover:bg-destructive"
                  >
                    {deletingId === prop.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
              {prop.title && (
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground truncate">{prop.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageManager;
