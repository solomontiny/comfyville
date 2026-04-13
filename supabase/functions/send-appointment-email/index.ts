import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service not configured");
    }

    // Verify the caller's identity
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create client with user's JWT to get their identity
    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { appointmentId } = await req.json();
    if (!appointmentId || typeof appointmentId !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role to look up the actual appointment from DB
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: appointment, error: apptError } = await supabaseAdmin
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .eq("user_id", user.id)
      .single();

    if (apptError || !appointment) {
      return new Response(
        JSON.stringify({ success: false, error: "Appointment not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use data from DB only — never trust client-supplied content
    const name = escapeHtml(appointment.name);
    const phone = escapeHtml(appointment.phone || "Not provided");
    const date = escapeHtml(appointment.appointment_date);
    const time = escapeHtml(appointment.appointment_time);
    const listingTitle = escapeHtml(appointment.listing_title);

    const adminEmail = "info@bookcomfyville.com";

    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FullSky Properties <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Appointment: ${listingTitle}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background: #1a1a2e; padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">New Viewing Appointment</h1>
              <p style="color: #a0a0b0; margin: 4px 0 0; font-size: 13px;">FullSky Properties Global</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; width: 120px;">Property</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px; font-weight: 500;">${listingTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">Date</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px; font-weight: 500;">📅 ${date}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">Time</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px; font-weight: 500;">🕐 ${time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">Client Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px; font-weight: 500;">👤 ${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Phone</td>
                  <td style="padding: 12px 0; color: #111827; font-size: 14px; font-weight: 500;">📞 ${phone}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 500;">⚡ Action Required</p>
                <p style="margin: 4px 0 0; color: #78350f; font-size: 13px;">Please confirm or respond to this appointment request.</p>
              </div>
            </div>
            <div style="background: #f9fafb; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">FullSky Properties Global — info@bookcomfyville.com</p>
            </div>
          </div>
        `,
      }),
    });

    if (!adminRes.ok) {
      const errorData = await adminRes.text();
      console.error("Resend API error:", errorData);
      throw new Error("Failed to send email");
    }

    const data = await adminRes.json();

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending appointment email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Email notification failed. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
