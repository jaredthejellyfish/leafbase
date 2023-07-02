# Next.js with Next-Auth [![wakatime](https://wakatime.com/badge/user/61cabc84-7492-4f6a-b301-5bbbdd324bc5/project/5d1cd45b-d781-442d-838e-f453723d9542.svg)](https://wakatime.com/badge/user/61cabc84-7492-4f6a-b301-5bbbdd324bc5/project/5d1cd45b-d781-442d-838e-f453723d9542)

A fully featured Next.js template with pre-configured Next-Auth, Google, Twitch, Discord OAuth providers, and Magic Link login. Built using the latest Next.js 13 and Tailwind CSS for styling.

## Getting Started

Set these variables in the .env file:

``` .env
DATABASE_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

TWITCH_CLIENT_ID=""
TWITCH_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXTAUTH_URL=""
NEXTAUTH_SECRET=""

SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""

SENDGRID_API_KEY=""
EMAIL_SERVER=""
EMAIL_FROM=""

SITE_URL=""
NEXT_PUBLIC_LEAFBASE_API_URL=""
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
