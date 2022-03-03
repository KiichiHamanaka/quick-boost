import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      twitterUID: number;
      screen_name: string;
      name: string;
      image: string;
    };
  }
}
