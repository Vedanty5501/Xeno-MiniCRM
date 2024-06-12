import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    async callback(url, req) {
        return `${req.protocol}://${req.get('host')}/api/auth/callback/${url}`;
      },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };