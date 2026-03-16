
-- Create service_properties table for admin to upload multiple property images per service
CREATE TABLE public.service_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view service properties (public storefront)
CREATE POLICY "Anyone can view service properties"
ON public.service_properties
FOR SELECT
TO public
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert service properties"
ON public.service_properties
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update service properties"
ON public.service_properties
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete service properties"
ON public.service_properties
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create a storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for property-images bucket
CREATE POLICY "Anyone can view property images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

CREATE POLICY "Admins can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));
