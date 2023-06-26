import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { html } from "@/lib/email";
import { createTransport } from "nodemailer";
import { NextAuthOptions } from "next-auth";

import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to leafbase.io",
          text: "Sign in to leafbase.io",
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
};

export { authOptions };
