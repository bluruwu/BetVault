import {createClient} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePubKey = import.meta.env.VITE_SUPABASE_PUB_KEY

if (!supabaseUrl || !supabasePubKey){
    throw new Error("Env variables missing")
}

export const supabase = createClient(supabaseUrl, supabasePubKey)
