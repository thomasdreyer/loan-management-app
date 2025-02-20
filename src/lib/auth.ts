import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        try {
          // Find the user by email asynchronously
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);

            if (isValid) {
              // Exclude the password field before returning the user object
              const { password, ...userWithoutPassword } = user;
              return userWithoutPassword;
            } else {
              throw new Error('Invalid password');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('Authorization failed');
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error',   // Custom error page
  },
  callbacks: {
    async session({ session, user }) {
      console.log('Session:', session); // Log the session to check if it contains user information
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Log the URL and base URL for debugging
      console.log('Redirecting to:', url);

      // Check if the user is trying to access a specific page after login
      if (url === '/auth/signin') {
        return baseUrl + '/dashboard'; // Redirect to dashboard after successful login
      }

      // Return the default redirect URL
      return url;
    },
  },
};

export default authOptions;



