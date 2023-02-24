import { Handler } from '@netlify/functions'

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log({ event });

    if (event.httpMethod == 'GET') {
        const urlParts = event.rawUrl.split("/");
        const nonce = urlParts[urlParts.length - 1];

        var { data, error } = await supabase.from('lottery_participants')
            .select('name, lottery_participants(name)')
            .eq('nonce', nonce)
            .eq('viewed', 'false');

        if (error) {
            console.log({ error });
            throw error;
        }

        if (data.length === 0) {
            return {
                statusCode: 410,
                body: `{}`
            };
        }

        console.log(JSON.stringify(data));

        var { error } = await supabase.from('lottery_participants')
            .update({ viewed: 'true' })
            .eq('nonce', nonce);

        if (error) {
            console.log({ error });
            throw error;
        }

        return {
            statusCode: 200,
            body: `{"gifter_name": "${data[0].name}", 
                    "giftee_name": "${data[0].lottery_participants[0].name}"}`
        };
    } else {
        return {
            statusCode: 405,
            body: '{}',
        };
    }
}
