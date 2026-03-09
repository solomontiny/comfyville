import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const SERVICE_KEYS = [
  "property-sales-rentals",
  "short-term-apartments",
  "property-management",
  "land-investment",
  "luxury-interior",
  "investor-guidance",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  "property-sales-rentals": "Property Sales & Rentals",
  "short-term-apartments": "Short-term & Serviced Apartments",
  "property-management": "Property Management & Facility Care",
  "land-investment": "Land & Investment Advisory",
  "luxury-interior": "Luxury Interiors & 3D Visualizations",
  "investor-guidance": "Investor & First-Time Buyer Guidance",
};

export { SERVICE_KEYS };

export function getServiceImageUrl(serviceKey: string): string | null {
  const { data } = supabase.storage
    .from("service-images")
    .getPublicUrl(`${serviceKey}.jpg`);
  return data?.publicUrl || null;
}

export function useServiceImage(serviceKey: ServiceKey, fallback: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallback);

  useEffect(() => {
    const checkImage = async () => {
      const { data } = await supabase.storage
        .from("service-images")
        .list("", { search: serviceKey });

      if (data && data.length > 0) {
        const file = data.find((f) => f.name.startsWith(serviceKey));
        if (file) {
          const { data: urlData } = supabase.storage
            .from("service-images")
            .getPublicUrl(file.name);
          if (urlData?.publicUrl) {
            setImageUrl(`${urlData.publicUrl}?t=${file.updated_at}`);
          }
        }
      }
    };
    checkImage();
  }, [serviceKey, fallback]);

  return imageUrl;
}

export function useAllServiceImages() {
  const [images, setImages] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.storage.from("service-images").list("");

    const result: Record<string, string | null> = {};
    SERVICE_KEYS.forEach((key) => {
      const file = data?.find((f) => f.name.startsWith(key));
      if (file) {
        const { data: urlData } = supabase.storage
          .from("service-images")
          .getPublicUrl(file.name);
        result[key] = `${urlData.publicUrl}?t=${file.updated_at}`;
      } else {
        result[key] = null;
      }
    });

    setImages(result);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { images, loading, refresh };
}
