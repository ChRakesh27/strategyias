import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentailsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";
import { redirect } from "next/dist/server/api-utils";
import UserActivityFunc from "@/app/(components)/UserActivityFunc";
const options = {
  providers: [
    // GitHubProvider({
    //   profile(profile) {
    //     let userRole = "github User";
    //     if (
    //       profile?.email === "pratham27900@gmail.com" ||
    //       profile?.email === "whitehorse.dev.sp@gmail.com"
    //     ) {
    //       userRole = "admin";
    //     }
    //     return {
    //       ...profile,
    //       role: userRole,
    //     };
    //   },

    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_Secret,
    // }),
    GoogleProvider({
      profile(profile) {
        let userRole = "Google Profile";
        if (
          profile?.email === "pratham27900@gmail.com" ||
          profile?.email === "skptrulyweb@gmail.com" ||
          profile?.email === "harshitsikka4@gmail.com" ||
          profile?.email === "chipparakesh01@gmail.com"
        ) {
          userRole = "admin";
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    // CredentailsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "email:",
    //       type: "text",

    //       placeholder: "your-email",
    //     },
    //     password: {
    //       label: "password:",
    //       type: "password",
    //       placeholder: "your-password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       await mongoose.connect(process.env.MONGO_URI);
    //       const foundUser = await User.findOne({ email: credentials.email })
    //         .lean()
    //         .exec();

    //       if (foundUser) {
    //         console.log("user exists");
    //         const match = await bcrypt.compare(
    //           credentials.password,
    //           foundUser.password
    //         );
    //         if (match) {
    //           console.log("good pass");
    //           delete foundUser.password;
    //           foundUser["role"] = "unverified Email";
    //           return foundUser;
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     return null;
    //   },
    // }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }

      if (account?.provider === "github") {
        await mongoose.connect(process.env.MONGO_URI);

        try {
          const existing = await User.findOne({ email: user.email });
          if (!existing) {
            const newUser = new User({
              userName: user.name,
              email: user.email,
              profile_img_url: user.avatar_url,
            });
            await newUser.save();
            return true;
          } else {
            return true;
          }
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      if (account?.provider === "google") {
        await mongoose.connect(process.env.MONGO_URI);

        try {
          await UserActivityFunc("User logged In", user.name, user.email);

          const existing = await User.findOne({ email: user.email });
          if (!existing) {
            const newUser = new User({
              userName: user.name,
              email: user.email,
              profile_img_url: user.picture,
            });
            await newUser.save();
            return true;
          } else {
            return true;
          }
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        await mongoose.connect(process.env.MONGO_URI);
        session.user.role = token.role;
        const dbUser = await User.findOne({ email: session.user.email })
          .lean()
          .exec();

        if (dbUser) {
          session.user.isVerified = dbUser.isVerified;
        }
      }
      return session;
    },
  },
};

export default options;
