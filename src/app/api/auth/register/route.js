

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { generateOTP } from '@/action';


export async function POST(request) {
    try {
      const { email, fullname, password } = await request.json();
     
      // Check if user already exists 
      const { data: existingUser, error: fetchError } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError);
      return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }


      const hashedPassword = await bcrypt.hash(password, 10);
      const {data , error } = await supabase
        .from('user')
        .insert({
         "email":email,
          "name": fullname,
          "password": hashedPassword
            
        }).select()
        // console.log(data)

        if (error) {
          return NextResponse.json({ 
            error: 'Registration failed' 
          }, { status: 500 });
        }

      
        const token =  jwt.sign(
          { userId: data[0].id, email: data[0].email ,name: data[0].name },
          process.env.JWT_SECRET,
          { expiresIn: '3d' }
        );
    
        await generateOTP({email, token , fullname})
      
   
   
   
    return NextResponse.json({ 
      message: 'User registered successfully',
      data:data
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      error: 'Registration failed' 
    }, { status: 500 });
  }
}






