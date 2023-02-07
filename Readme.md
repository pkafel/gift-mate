# GiftMate

GiftMate is a service that allows user to match people for Christmas gift lottery. User need to input participant of the lottery and GiftMate will assign them to each other. For every participant GiftMate will generate unique and one time use only link which will reveal who user will gift.

The service is hosted here.

The service is a good example of integration between [Netlify](https://www.netlify.com/) and [Supabase](https://supabase.com/) as it is using:
* Static site hosting and serverless functions from Netlify
* Postgresql from Supabase

# Architecture

// TBD

# Structure

* HTML with CSS and background picture can be found in `netlify/web`
* Serverless function called from the frontend can be found in `netlify/functions`
* Database schema and functions are in `supabase/migrations`

# Working with database

In order to use described commands you need to have installed [Supabase CLI](https://supabase.com/docs/reference/cli/start), authenticate and link it to the project.

* `supabase migration list` shows all the local and remote migrations that have been applied
* `supabase db push` applies migrations to remote dataase
* `supabase db reset` reset all local migrations and applies them again
* `supabase migration repair <id> --status reverted ` revert migration in remote database

# Working with web hosting and serverless functions

In order to use described commands you need to have installed [Netlify CLI](https://docs.netlify.com/cli/get-started/), authenticate and link it to the project.

* `netlify dev` ramp up netlify functions and web hosting locally
