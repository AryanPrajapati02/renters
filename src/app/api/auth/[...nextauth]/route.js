import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import {supabase} from "@/lib/db"
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }),
    ],
   
    callbacks: {
      async signIn({ user, account }) {
        if (account.provider !== 'google') {
          return false; // Only handle Google sign-in
        }
      
        try {
          // Check if user already exists in Supabase
          const { data: existingUser, error: fetchError } = await supabase
            .from('user')
            .select('*')
            .eq('email', user.email)
            .single();
      
          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user:', fetchError);
            return false;
          }
      
          let userId;
      
          if (!existingUser) {
            // User does not exist, insert new user
            const { data: newUser, error: insertError } = await supabase
              .from('user')
              .insert({
                email: user.email,
                name: user.name,
                password: 'google852041', // Placeholder password
                verified: true,
              })
              .select('*')
              .single();
      
            if (insertError) {
              console.error('Error inserting user:', insertError);
              return false;
            }
      
            userId = newUser.id;
          } else {
            userId = existingUser.id;
          }
      
          // Create JWT token
          const token = jwt.sign(
            { userId, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
          );
      
          // Set token in cookie
          const cookieStore = cookies();
          cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 3, // 3 days
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            sameSite: 'strict',
            path: '/',
          });
      
          return true;
        } catch (error) {
          console.error('Error during sign-in process:', error);
          return false;
        }
      }
      // async session({ session, token }) {
      //     if (token && token.sub) {
      //       session.user.id = token.sub;
      //     }
      //     return session;
      //   },
      // async jwt({ token, user }) {
      //       if (user) {
      //         token.sub = user.id;
      //       }
      //       return token;
      //     },
       
      },
      session: {
        strategy: 'jwt',
      },
      jwt: {
        signingKey: process.env.JWT_SECRET,
      }

})

export { handler as GET, handler as POST }