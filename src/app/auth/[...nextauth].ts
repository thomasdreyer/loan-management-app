import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../lib/prisma';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    // You can add more providers (Google, Email, etc.)
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin'  // (Optional) Custom sign-in page route
  },
  callbacks: {
    async session({ session, user }) {
      // Optionally add user id to session
      if (session.user !== undefined) {
        (session.user as { id?: string }).id = user.id;
      } else {
       alert('AUTH ERROR');
      }
      return session;
    }
  }
});
