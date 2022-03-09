import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../db/mongodb";
import mongoose from "mongoose";

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      // @ts-ignore
      profile(profile) {
        return {
          id: new mongoose.Types.ObjectId(),
          name: profile.name,
          twitterId: profile.screen_name,
          twitterUID: profile.id,
          twitterName: profile.name,
          openSNSSettings: "No",
          image: profile.profile_image_url,
          bio: profile.description,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.twitterUID = user.twitterUID as number;
      session.user.twitterName = user.twitterName as string;
      session.user.twitterId = user.twitterId as string;
      return session;
    },
  },
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
});
