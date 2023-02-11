import { Handler } from '@netlify/functions'

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

interface GiftMateFormData {
  name: string
  description: string
  participants: string
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log({event});

  if(event.httpMethod == 'POST') {
    const formData: GiftMateFormData = JSON.parse(event.body);

    const { data, error } = await supabase.rpc('add_lottery_with_participants', 
      {name_arg: formData.name, description_arg: formData.description, participants_arg: formData.participants});

    if(error) {
      console.log({error});
      throw error;
    }

    console.log(`Created lottery: ${data}`);

    return {
      statusCode: 201,
      body: `{"id": "${data}"}`,
    };
  } else {
    return {
      statusCode: 405,
      body: "{}",
    }
  }
}
