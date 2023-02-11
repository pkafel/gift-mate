import { Handler } from '@netlify/functions'

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);


export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log({event});
    return {
        statusCode: 405,
        body: "{}",
      };
}