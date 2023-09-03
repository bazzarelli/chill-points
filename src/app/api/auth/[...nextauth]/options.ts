import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: process.env.DISCORD_ID!,
    //   clientSecret: process.env.DISCORD_SECRET!,
    // }),
    ...(process.env.NODE_ENV === "development"
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
          }),
        ]
      : []),
    // EmailProvider({
    //   type: "email",
    //   async sendVerificationRequest({ identifier: email, url }) {
    //     const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    //       body: JSON.stringify({
    //         personalizations: [{ to: [{ email }] }],
    //         from: { email: process.env.EMAIL_FROM },
    //         subject: "Chill Points - Verify Your Email",
    //         content: [
    //           {
    //             type: "text/plain",
    //             value: `Please click here to authenticate - ${url}`,
    //           },
    //         ],
    //       }),
    //       headers: {
    //         Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //     });

    //     if (!response.ok) {
    //       const { errors } = await response.json();
    //       throw new Error(JSON.stringify(errors));
    //     }
    //   },
    // }),
  ],
};
