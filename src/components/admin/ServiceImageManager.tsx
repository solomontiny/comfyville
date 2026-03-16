import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image, Loader2, Check, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  SERVICE_KEYS,
  SERVICE_LABELS,
  useAllServiceImages,
  type ServiceKey,
} from "@/hooks/useServiceImages";

// Static fallback images for display
import serviceSales from "@/assets/service-sales.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";
import serviceManagement from "@/assets/service-management.jpg";
import serviceLand from "@/assets/service-land.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceGuidance from "@/assets/service-guidance.jpg";

const FALLBACKS: Record<ServiceKey, string> = {
  "property-sales-rentals": serviceSales,
  "short-term-apartments": serviceApartments,
  "property-management": serviceManagement,
  "land-investment": serviceLand,
  "luxury-interior": serviceInterior,
  "investor-guidance": serviceGuidance,
};

const ServiceImageManager = () => {
  const { images, loading, refresh } = useAllServiceImages();
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeKey, setActiveKey] = useState<ServiceKey | null>(null);

  const handleUpload = async (file: File, serviceKey: ServiceKey) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }

    setUploading(serviceKey);

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${serviceKey}.${ext}`;

    // Remove existing file first
    await supabase.storage.from("service-images").remove([`${serviceKey}.jpg`, `${serviceKey}.png`, `${serviceKey}.webp`]);

    const { error } = await supabase.storage
      .from("service-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error(`Upload failed: ${error.message}`);
    } else {
      toast.success(`Image updated for ${SERVICE_LABELS[serviceKey]}`);
      await refresh();
    }
    setUploading(null);
  };

  const handleDelete = async (serviceKey: ServiceKey) => {
    setDeleting(serviceKey);
    await supabase.storage
      .from("service-images")
      .remove([`${serviceKey}.jpg`, `${serviceKey}.png`, `${serviceKey}.webp`]);
    toast.success("Image removed. Default image will be used.");
    await refresh();
    setDeleting(null);
  };

  const triggerFileInput = (key: ServiceKey) => {
    setActiveKey(key);
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeKey) {
      handleUpload(file, activeKey);
    }
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
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICE_KEYS.map((key) => {
          const currentImage = images[key] || FALLBACKS[key];
          const hasCustom = !!images[key];

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={currentImage}
                  alt={SERVICE_LABELS[key]}
                  className="w-full h-full object-cover"
                />
                {hasCustom && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} /> Custom
                    </span>
                  </div>
                )}
                {uploading === key && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {SERVICE_LABELS[key]}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {hasCustom ? "Custom image uploaded" : "Using default image"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerFileInput(key)}
                    disabled={uploading === key}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Upload size={12} />
                    {hasCustom ? "Replace" : "Upload"}
                  </button>
                  {hasCustom && (
                    <button
                      onClick={() => handleDelete(key)}
                      disabled={deleting === key}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-destructive border border-destructive/30 px-3 py-2 rounded hover:bg-destructive/10 transition-colors disabled:opacity-50"
                    >
                      {deleting === key ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceImageManager;
