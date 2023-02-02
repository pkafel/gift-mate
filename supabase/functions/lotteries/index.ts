// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface GiftMateFormData {
  name: string
  description: string
  participants: string
}

function getParticipants(participants: string): string[] {
  return [];
}

serve(async (req : Request) => {

  const { url, method } = req

  if(method == 'POST') {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const formData: GiftMateFormData = await req.json()
    console.log("Form data:" + JSON.stringify(formData))

    
    const { data, error } = await supabaseClient.rpc('add_lottery_with_participants', 
      {name_arg: formData.name, description_arg: formData.description, participants_arg: formData.participants})

    if(error) {
      throw error
    }

    console.log("Response data:" + JSON.stringify(data))

    return new Response(
      `{"lottery_id": ${data}}`, { 
        headers: { "Content-Type": "application/json" },
        status: 201,
      },
    )
  } else {
    return new Response(
      "{}", { 
        headers: { "Content-Type": "application/json" },
        status: 405,
    });
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
