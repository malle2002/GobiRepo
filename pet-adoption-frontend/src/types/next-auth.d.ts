import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    provider: string;
    accessToken: string;
    image?: string;
  }

  interface Session extends DefaultSession {
      user?: User;
  }
}

interface AccountType {
  provider: string;
  access_token: string;
  
}
