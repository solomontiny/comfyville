-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view service images (public bucket)
CREATE POLICY "Anyone can view service images"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-images');

-- Only admins can upload service images
CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'service-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update service images
CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'service-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete service images
CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'service-images'
  AND public.has_role(auth.uid(), 'admin')
);