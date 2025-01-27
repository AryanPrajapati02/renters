

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';



export async function POST(request) {
   
        try {
          const { email, password } = await request.json();
      
          // Fetch user from database
          const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('email', email)
            .single();
      
          if (error || !data){
            return res.json({error: 'User not found'}, { status: 404 });
          };
      
          // Compare password
          const isMatch = await bcrypt.compare(password, data.password);
          if (!isMatch){
            return res.json({ error: 'Invalid credentials' }, { status: 401 });
          };
      
          // Create JWT token
          const token = await jwt.sign(
            { userId: data.id, email: data.email , name: data.name },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
          );
          const cookieStore = await cookies()
            cookieStore.set('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 3 // 3 days
            });
      
          return NextResponse.json({
            message: 'Login successful',
            token
          }, { status: 200 });
      
        } catch (error) {
          // //console.error('Login error:', error);
          return NextResponse.json({
            error: 'Login failed'
          }, { status: 401 });
        }
      }