
-- Admin roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Admins can view all subscribers
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Chat logs table
CREATE TABLE public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Users can insert their own chat logs
CREATE POLICY "Users can insert own chat logs"
ON public.chat_logs FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own chat logs
CREATE POLICY "Users can update own chat logs"
ON public.chat_logs FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all chat logs
CREATE POLICY "Admins can view all chat logs"
ON public.chat_logs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view own chat logs
CREATE POLICY "Users can view own chat logs"
ON public.chat_logs FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Admin can view all appointments
CREATE POLICY "Admins can view all appointments"
ON public.appointments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update all appointments
CREATE POLICY "Admins can update all appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for chat_logs updated_at
CREATE TRIGGER update_chat_logs_updated_at
BEFORE UPDATE ON public.chat_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
