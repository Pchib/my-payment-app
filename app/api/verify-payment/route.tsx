import { NextResponse,NextRequest } from "next/server";
import axios from 'axios';
let nodemailer = require('nodemailer')
let QRCode = require('qrcode')

import { createWriteStream } from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(createWriteStream);
// POST endpoint to validate user credentials
export async function GET(req: NextRequest) {
  try {
  
    const reference = req.nextUrl.searchParams.get('reference');
   

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer sk_test_28c2f770fed441b35961ba56066e5d6f32c5e5a0`,
        },
      }
    );


    const transaction = response.data.data;
    const { email } = transaction.customer;

    console.log({ urlfinial: response.data.data.status  });
    if (response.data.data.status = 'success'){
      const protectedUrl = `https://takeoveratthesummit.netlify.app/protected?email=${encodeURIComponent(email)}`;
      const qrCode = await QRCode.toDataURL(protectedUrl);
 // Convert data URL to buffer
 const buffer = Buffer.from(qrCode.split(",")[1], "base64");

  // Write buffer to a file
  const filePath = `./qr_code.png`;
  const writeStream = createWriteStream(filePath, { encoding: 'binary' }); // specify encoding as 'binary'
  await writeStream.write(buffer);
  await writeStream.end();

      const mailOptionsToOrganizers = {
        from: 'takeoveratthesummit@gmail.com',
        to:email,
        bcc: 'uicsoft1@gmail.com',
        subject: `Your Qr Code`,
        html: `
          <p> <p>Thank you for your payment. Scan the QR code to access your content:</p></p>
        `, attachments: [
          {
            filename: 'qr_code.png',
            path: filePath
          }
        ]
      }
      
      await transporter4.sendMail(mailOptionsToOrganizers)
    }
    return NextResponse.json(response.data.data);

  } catch (error) {
  
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: error || "An error occurred" });
  }
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

  