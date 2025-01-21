import React from 'react';

// export function EmailTemplate({ firstname, otp }) {
//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
//       <h2 style={{ color: '#4CAF50' }}>Hello {firstname},</h2>
//       <p>We received a request to verify your email address. Use the OTP code below to complete the process:</p>
//       <div style={{ backgroundColor: '#f9f9f9', padding: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', border: '1px dashed #ccc', margin: '20px 0' }}>
//         {otp}
//       </div>
//       <p>If you didn’t request this, you can safely ignore this email.</p>
//       <p>Thank you,</p>
//       <p style={{ marginTop: '10px', color: '#888' }}>The Renter Team</p>
//     </div>
//   );
// }

const EmailTemplate = ({ firstname, otp }) => {
    return `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
       <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
         <h2 style="color: #007BFF;">OTP Verification</h2>
         <p>Hi ${firstname},</p>
         <p>Your OTP for verification is: <strong>${otp}</strong></p>
         <p style="font-size: 12px; color: #999;">
           If you did not request this email, please ignore it.
         </p>
       </div>
     </div>

    
    `;
  };
  
  export default EmailTemplate;