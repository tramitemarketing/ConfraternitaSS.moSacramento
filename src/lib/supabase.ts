import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Variabili d'ambiente Supabase mancanti: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY"
  );
}

// Client con service role key — solo server-side, mai esposto al browser.
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
