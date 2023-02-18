# GiftMate

GiftMate is a service that allows user to match people for Christmas gift lottery. User need to input participant of the lottery and GiftMate will assign them to each other. For every participant GiftMate will generate unique and one time use only link which will reveal who user will gift.

The service is hosted here.

The service is a good example of integration between [Netlify](https://www.netlify.com/) and [Supabase](https://supabase.com/) as it is using:
* Static site hosting and serverless functions from Netlify
* PostgreSQL from Supabase

## High level architecture

```mermaid
flowchart LR
    subgraph Netlify
      direction TB
      lottery_function[Lottery function]
      user_function[User function]
      web_page[Web page with resources]
    end
    subgraph Supabase
    direction LR
      postgrest[PostgREST]
      subgraph PostgreSQL
        direction TB
        lotteries[lotteries table]
        lottery_participants[lottery_participants table]
        add_lottery_with_participants[add_lottery_with_participants function]
        add_lottery_with_participants-->|writes to|lotteries
        add_lottery_with_participants-->|writes to|lottery_participants
      end
      postgrest --> PostgreSQL
    end
    browser{Browser}
    browser --> lottery_function
    browser --> user_function
    browser --> web_page
    lottery_function --> postgrest
    user_function --> postgrest
```

## Available urls

* `/` main page with the form
* `#lottery/<uuid>` summary of the lottery
* `#user/<nonce>` reveal link that shows user who they should gift

## Repository structure

* HTML with CSS and background picture can be found in `netlify/web`
* Serverless function called from the frontend can be found in `netlify/functions`
* Database schema and functions are in `supabase/migrations`

## Working with database

In order to use described commands you need to have installed [Supabase CLI](https://supabase.com/docs/reference/cli/start), authenticate and link it to the project. All the commands need to be executed from `supabase` directory.

* `supabase migration list` shows all the local and remote migrations that have been applied
* `supabase db push` applies migrations to remote dataase
* `supabase db reset` reset all local migrations and applies them again
* `supabase migration repair <id> --status reverted ` revert migration in remote database

## Working with web hosting and serverless functions

In order to use described commands you need to have installed [Netlify CLI](https://docs.netlify.com/cli/get-started/), authenticate and link it to the project. All the commands need to be executed from `netlify` directory.

* `netlify dev` ramp up netlify functions and web hosting locally
