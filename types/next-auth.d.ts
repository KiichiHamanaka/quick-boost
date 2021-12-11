import NextAuth from "next-auth";
import { User } from "../models/User";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      twitterID: string;
      name: string;
      image: string;
      user: User;
    };
  }
}
