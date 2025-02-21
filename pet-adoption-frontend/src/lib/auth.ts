import axios from '@/src/lib/axios';
import { Account, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "example@.com" },
            password: { label: "Passwrod", type: "password" },
        },
        async authorize(credentials) {
            const res = await axios.post('/api/login', {
                email: credentials?.email,
                password: credentials?.password
            }, {
              headers: {
                'Content-Type': 'application/json',
              }
            });

            const user = await res.data;

            if (user?.access_token) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessToken: user.access_token,
                    image: user.picture,
                    provider: "credentials",
                };
            }
            return null;
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error'
  },
  callbacks: {
    async jwt({ token, user, account} : { token: JWT, user: User, account: Account | null }) {
      if ( account !== undefined && account?.provider == 'google') {
        try {
          const res = await axios.post("/api/auth/google", {
            access_token: account.access_token
          });
    
          if (res.data.access_token) {
            token.accessToken = res.data.access_token;
            token.provider = account.provider;
          }
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      }

      if (user) {
        token.accessToken = (token.accessToken !== undefined && token.accessToken !== null) ? token.accessToken : user.accessToken;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.provider = account?.provider??user.provider;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
        provider: token.provider,
        accessToken: token.accessToken, 
      } as User;
    
      return session;
    },    
    async redirect({ baseUrl }) {
      return baseUrl;
    },  
  },
  session: {
    strategy: 'jwt',
  }
}