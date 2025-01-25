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
        async signIn({ user, account}) {
          if (account.provider === 'google') {
            // Check if user already exists in Supabase
            const { data, error } = await supabase
              .from('user')
              .select('*') 
              .eq('email', user.email)
              .single();
    
            if (error && error.code !== 'PGRST116') {
              console.error('Error fetching user:', error);
              return false;
            }
    
            if (!data) {
              // User does not exist, insert new user
              const { error: insertError } = await supabase
                .from('user')
                .insert({
                  email: user.email,
                  name: user.name,
                  password:"google852041",
                  verified: true
                });
    
              if (insertError) {
                console.error('Error inserting user:', insertError);
                return false;
              }
            }
           
            console.log(data)
      
            // Create JWT token
            const token =await jwt.sign(
              { userId: data?.id, email: data.email },
              process.env.JWT_SECRET,
              { expiresIn: '3d' }
            );
            
            console.log(data)
    
            // Set token in cookie
            const cookieStore = await cookies();
            cookieStore.set('token', token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 3, // 3 days
            });
    
            return true;
          }

          return false;
        },

        async session({ session, token }) {
          if (token && token.sub) {
            session.user.id = token.sub;
          }
          return session;
        },
        async jwt({ token, user }) {
            if (user) {
              token.sub = user.id;
            }
            return token;
          },
       
      },
      session: {
        strategy: 'jwt',
      },
      jwt: {
        signingKey: process.env.JWT_SECRET,
      }

})

export { handler as GET, handler as POST }