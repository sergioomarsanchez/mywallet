import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

export const authOption: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = bcrypt.compareSync(
          credentials.password,
          user.password
        );
        if (user && isValidPassword) {
          return user;
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "credentials") {
        return true;
      }

      if (!profile?.email) {
        throw new Error("No profile");
      }

      try {
        const avatarUrl = profile.picture || profile.avatar_url;

        await prisma.user.upsert({
          where: { email: profile.email },
          create: {
            email: profile.email,
            firstName: profile.given_name || profile.name.split(" ")[0] || "",
            lastName:
              profile.family_name || profile.name.split(" ").slice(-1)[0] || "",
            avatar: avatarUrl,
            password: "",
          },
          update: {
            firstName: profile.given_name || profile.name.split(" ")[0] || "",
            lastName:
              profile.family_name || profile.name.split(" ").slice(-1)[0] || "",
            avatar: avatarUrl,
          },
        });
      } catch (error) {
        console.error("Error creating/updating user:", error);
        return false;
      }
      return true;
    },
    async jwt({ token, user, profile }: any) {
      if (profile) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.avatar = dbUser.avatar;
          token.lastName = dbUser.lastName;
          token.firstName = dbUser.firstName;
        }
      } else if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
        token.lastName = user.lastName;
        token.firstName = user.firstName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.avatar;
        session.user.name = token.firstName + " " + token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn:"/profile",
    error: "/auth/error",
    newUser: "/welcome",
  },
};
