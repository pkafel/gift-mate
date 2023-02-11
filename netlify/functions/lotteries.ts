import { Handler } from '@netlify/functions'

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

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
  } else if(event.httpMethod == 'GET') {
    const urlParts = event.rawUrl.split("/");
    if(uuidRegex.test(urlParts.slice(-1))) {
      console.log(`Get lottery: ${urlParts.slice(-1)}`);
      return {
        statusCode: 200,
        body: `{"participants:[]"}`,
      }
    } else {
      return {
        statusCode: 400,
        body: `{"participants:[]"}`,
      }
    }
  } else {
    return {
      statusCode: 405,
      body: "{}",
    }
  }
}
