# Next.js with Next-Auth

A fully featured Next.js template with pre-configured Next-Auth, Google, Twitch, Discord OAuth providers, and Magic Link login. Built using the latest Next.js 13 and Tailwind CSS for styling.

## Getting Started

Set these variables in the .env file:
```
DATABASE_URL=""
DIRECT_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NEXTAUTH_URL=""
NEXTAUTH_SECRET=""

SENDGRID_API_KEY=""
EMAIL_SERVER=""
EMAIL_FROM=""
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
