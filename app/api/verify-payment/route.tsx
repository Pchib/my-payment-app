import { NextResponse,NextRequest } from "next/server";
let axios = require('axios')
let nodemailer = require('nodemailer')
let QRCode = require('qrcode')
import url from 'url';

import { createWriteStream } from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(createWriteStream);
// POST endpoint to validate user credentials
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  
  console.log({ reference:  'test working'});
  console.log('                ');
  console.log('                ');
  console.log('                ');
  console.log('                ');
  console.log('                ');
  try {
  
    // const reference = req.nextUrl.searchParams.get('reference');
    const queryObject = url.parse(req.url, true).query;
    const reference = queryObject.reference;
    console.log({ reference: reference });

    console.log({ reference:  reference});
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer sk_test_28c2f770fed441b35961ba56066e5d6f32c5e5a0`,
        },
      }
    );

    console.log({ response:  response});
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');

    const transaction = response.data.data;
    const { email } = transaction.customer;

    console.log({ urlfinial: response.data.data.status  });
    if (response.data.data.status = 'success'){
      const protectedUrl = `https://takeoveratthesummit.netlify.app/protected?email=${encodeURIComponent(email)}`;
      const qrCode = await QRCode.toDataURL(protectedUrl);
 // Convert data URL to buffer
 const buffer = Buffer.from(qrCode.split(",")[1], "base64");

 console.log({ qrcode:  qrCode});
 console.log('                ');
 console.log('                ');
 console.log('                ');
 console.log('                ');
 console.log('                ');
  // Write buffer to a file


      const mailOptionsToOrganizers = {
        from: 'takeoveratthesummit@gmail.com',
        to:email,
        bcc: 'uicsoft1@gmail.com',
        subject: `Your Qr Code`,
        html: `
          <p> <p>Thank you for your payment. Scan the QR code to access your content:</p></p> <img src="${qrCode}" />
        `, attachments: [
          {
            filename: 'qr_code.png',
            path: qrCode
          }
        ]
      }
      
      await transporter4.sendMail(mailOptionsToOrganizers)
    }
    
    console.log({ refdata:  response.data});
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    return NextResponse.json(response.data.data);
    

  } catch (error) {
    console.log({frontend :'not working', error: error});

    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: error || "An error occurred" });
  }
  console.log({frontend :'not working', });

}

const transporter4 = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "takeoveratthesummit@gmail.com",
    pass: "awii fkyn sdnn oueo",}
  });

  