import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { redirect } from "next/navigation";

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
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // Register new user
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const verificationToken = crypto.randomBytes(20).toString("hex");

          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              firstName: credentials.firstName,
              lastName: credentials.lastName,
              emailVerificationToken: verificationToken,
            },
          });

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            to: credentials.email,
            from: process.env.EMAIL_USER,
            subject: "Email Verification",
            text: `Welcome to My Wallet!\n\nPlease verify your email by clicking the link below:\n\n
                   http://localhost:3000/verify/${verificationToken}\n\n
                   If you did not create an account, please ignore this email.\n`,
          };

          await transporter.sendMail(mailOptions);

          return newUser;
        }

        const isValidPassword = bcrypt.compareSync(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        if (!user.isEmailVerified) {
          throw new Error("Email not verified");
        }

        return user;
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
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === "credentials" && !user.isEmailVerified) {
        // Redirigir a la página de verificación
        return redirect("/auth/verify-request");
      }
      if (account.provider === "credentials") {
        return true;
      }

      if (!profile?.email) {
        throw new Error("No profile email");
      }


      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          const verificationToken = crypto.randomBytes(20).toString("hex");

          await prisma.user.create({
            data: {
              email: profile.email,
              firstName: profile.name.split(" ")[0] || "",
              lastName:
                profile.name.split(" ")[profile.name.split(" ").length - 1] ||
                "",
              password: "",
              avatar: profile.picture || profile.avatar_url || "",
              emailVerificationToken: verificationToken,
            },
          });

          // Send email verification
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            to: profile.email,
            from: process.env.EMAIL_USER,
            subject: "Email Verification",
            text: `Welcome to My Wallet!\n\nPlease verify your email by clicking the link below:\n\n
                   http://localhost:3000/verify/${verificationToken}\n\n
                   If you did not create an account, please ignore this email.\n`,
          };

          await transporter.sendMail(mailOptions);
        } else {
          const avatarUrl = profile.picture || profile.avatar_url;

          await prisma.user.update({
            where: { email: profile.email },
            data: { avatar: avatarUrl },
          });
        }
      } catch (error) {
        console.error("Error updating or creating user:", error);
        return false;
      }
      return true;
    },
    async jwt({ token, user, profile }: any) {
      if (profile) {
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.avatar = dbUser.avatar;
          token.lastName = dbUser.lastName;
          token.firstName = dbUser.firstName;
          token.isEmailVerified = dbUser.isEmailVerified;
        }
      } else if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
        token.lastName = user.lastName;
        token.firstName = user.firstName;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.avatar;
        session.user.name = `${token.firstName} ${token.lastName}`;
        session.user.isEmailVerified = token.isEmailVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/profile/overview",
    error: "/auth/error",
    newUser: "/auth/verify-request",
  },
};
