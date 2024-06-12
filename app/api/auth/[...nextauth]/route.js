import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user,profile)
      return true
    },
    async callback(url, req) {
        return `${req.protocol}://${req.get('host')}/api/auth/callback/${url}`;
      },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };