import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        token.screen_name = profile.screen_name;
      }
      return token;
    },
    session: async function ({ session, token }) {
      session.user.screen_name = token.screen_name as string;
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
