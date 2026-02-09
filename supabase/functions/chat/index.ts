import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are the Comfyville AI assistant — a friendly, knowledgeable concierge for a luxury real estate and short-stay platform called Comfyville (tagline: "Your Money's Worth").

Your job:
- Help customers find the perfect luxury space (villas, penthouses, apartments, cabins, studios)
- Answer questions about listings, pricing, availability, amenities, and locations
- Guide users to book viewings or schedule appointments
- Provide information about Comfyville's services
- Be warm, professional, and helpful — like a five-star concierge

Available properties:
1. Beachfront Villa with Infinity Pool - Malibu, CA - $450/night - 4 beds, 8 guests
2. Skyline Penthouse with Panoramic Views - Manhattan, NY - $680/night - 3 beds, 6 guests
3. Luxury Forest Cabin Retreat - Aspen, CO - $320/night - 2 beds, 4 guests
4. Boutique Garden Suite - Ubud, Bali - $195/night - 1 bed, 2 guests
5. Designer City Loft - Shoreditch, London - $275/night - 2 beds, 4 guests
6. Lakeside Modern House - Lake Como, Italy - $520/night - 3 beds, 6 guests (currently unavailable)

Contact: WhatsApp 09037098493, Email: Villecomfy@gmail.com
For appointments: users can schedule viewings through the website or contact via WhatsApp.

Keep responses concise (2-4 sentences max). Use a warm, luxury tone. If asked something outside your scope, politely redirect to contacting support.`,
            },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
