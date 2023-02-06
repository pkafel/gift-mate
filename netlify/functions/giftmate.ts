import { Handler } from '@netlify/functions'

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log({event}, {context})
  const { name = 'stranger' } = event.queryStringParameters

  if(event.httpMethod == 'POST') {
    const body = event.body;
    const { data, error } = await supabase.rpc('add_lottery_with_participants', 
      {name_arg: body.name, description_arg: body.description, participants_arg: body.participants});

    if(error) {
      throw error
    }

    return {
      statusCode: 201,
      body: '{}',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  }
}
