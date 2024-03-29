import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../db/mongodb";

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          twitterId: profile.data.username,
          twitterUID: profile.data.id,
          openSNSSettings: "No",
          image: profile.data.profile_image_url,
          bio: profile.data.description,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.twitterUID = user.twitterUID as string;
      session.user.name = user.name as string;
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
