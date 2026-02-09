-- Create a validation trigger for appointments
CREATE OR REPLACE FUNCTION public.validate_appointment()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  valid_listing_ids TEXT[] := ARRAY[
    'beachfront-villa-malibu',
    'skyline-penthouse-nyc',
    'forest-cabin-retreat',
    'boutique-suite-bali',
    'city-loft-london',
    'lakeside-house-como'
  ];
BEGIN
  -- Validate name: non-empty, max 100 chars, only letters/spaces/hyphens/apostrophes
  IF NEW.name IS NULL OR length(trim(NEW.name)) = 0 THEN
    RAISE EXCEPTION 'Name is required.';
  END IF;
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be 100 characters or fewer.';
  END IF;
  IF NEW.name !~ '^[a-zA-Z\s\-''\.]+$' THEN
    RAISE EXCEPTION 'Name contains invalid characters.';
  END IF;

  -- Validate phone: optional, but if provided must match phone pattern and max 20 chars
  IF NEW.phone IS NOT NULL AND length(trim(NEW.phone)) > 0 THEN
    IF length(NEW.phone) > 20 THEN
      RAISE EXCEPTION 'Phone number must be 20 characters or fewer.';
    END IF;
    IF NEW.phone !~ '^[\+0-9\s\(\)\-]+$' THEN
      RAISE EXCEPTION 'Phone number contains invalid characters.';
    END IF;
  END IF;

  -- Validate listing_id: must be in the known set
  IF NOT (NEW.listing_id = ANY(valid_listing_ids)) THEN
    RAISE EXCEPTION 'Invalid listing ID.';
  END IF;

  -- Validate listing_title: max 200 chars
  IF length(NEW.listing_title) > 200 THEN
    RAISE EXCEPTION 'Listing title must be 200 characters or fewer.';
  END IF;

  -- Validate appointment_date: must be in the future (not today or past)
  IF NEW.appointment_date <= CURRENT_DATE THEN
    RAISE EXCEPTION 'Appointment date must be in the future.';
  END IF;

  -- Validate appointment_time: must match expected format
  IF NEW.appointment_time !~ '^\d{2}:\d{2}\s(AM|PM)$' THEN
    RAISE EXCEPTION 'Invalid appointment time format.';
  END IF;

  -- Sanitize: trim whitespace from text fields
  NEW.name := trim(NEW.name);
  IF NEW.phone IS NOT NULL THEN
    NEW.phone := trim(NEW.phone);
  END IF;
  NEW.listing_title := trim(NEW.listing_title);

  RETURN NEW;
END;
$$;

-- Attach trigger to appointments table for INSERT and UPDATE
CREATE TRIGGER validate_appointment_trigger
BEFORE INSERT OR UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.validate_appointment();