// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Use the credentials to authenticate the user
        if (credentials) {
          const { username, password } = credentials;
          // Implement your authentication logic here
          // Example: Check if the username and password match a user in your database
          if (username === 'admin' && password === 'secret') {
            const user = { id: '1', username, name: 'Admin User' };
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};
