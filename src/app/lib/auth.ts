import prisma from "./prisma";
import { session } from "./session";
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

        const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
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
    async signIn({ user, account, profile }) {
      if (account.provider === 'credentials') {
        // Para el flujo de credenciales, no necesitamos verificar profile
        return true;
      }

      if (!profile?.email) {
        throw new Error("No profile");
      }

      try {
        const avatarUrl = profile.picture || profile.avatar_url; // Obteniendo la URL del avatar

        await prisma.user.upsert({
          where: { email: profile.email },
          create: {
            email: profile.email,
            firstName: profile.given_name || profile.name.split(" ")[0] || "",
            lastName: profile.family_name || profile.name.split(" ").slice(-1)[0] || "",
            avatar: avatarUrl, // Guardando la URL del avatar
            password: "", // No password for OAuth users
          },
          update: {
            firstName: profile.given_name || profile.name.split(" ")[0] || "",
            lastName: profile.family_name || profile.name.split(" ").slice(-1)[0] || "",
            avatar: avatarUrl, // Actualizando la URL del avatar si existe
          },
        });
      } catch (error) {
        console.error("Error creating/updating user:", error);
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    error: "/auth/error",
    newUser: "/welcome",
  },
};
