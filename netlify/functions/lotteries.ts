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

async function createLottery(body:string) {
  const formData: GiftMateFormData = JSON.parse(body);

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
}

async function getLotteryParticipants(url:string) {
  const urlParts = url.split("/");
  const lotteryId = urlParts[urlParts.length - 1];

  if(uuidRegex.test(lotteryId)) {
    console.log(`Get lottery: ${lotteryId}`);

    const { data, error } = await supabase.from('lotteries')
      .select(`lottery_uuid, lottery_participants(name, nonce, viewed)`)
      .eq('lottery_uuid', lotteryId);

    if(error) {
      console.log({error});
      throw error;
    }

    if(data.length === 0 || data[0].lottery_participants.length === 0) {
      return {
        statusCode: 404,
        body: `{"participants:[]"}`,
      }
    }

    console.log(data[0].lottery_participants);
    return {
      statusCode: 200,
      body: `{"participants": ${data[0].lottery_participants}}`,
    }
  } else {
    return {
      statusCode: 400,
      body: `{"participants:[]"}`,
    }
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log({event});

  if(event.httpMethod == 'POST') {
    return createLottery(event.body);
  } else if(event.httpMethod == 'GET') {
    return getLotteryParticipants(event.rawUrl);
  } else {
    return {
      statusCode: 405,
      body: "{}",
    }
  }
}
