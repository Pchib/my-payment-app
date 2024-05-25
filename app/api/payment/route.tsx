import { NextResponse,NextRequest } from "next/server";
let axios = require('axios')

// POST endpoint to validate user credentials
export async function POST(req: NextRequest) {
  try {
    // Extract the form data from the request
    const { name, email } = await req.json();
    // const { name, email } = req.body;
    const paymentData = {
        email: email,
        amount: 5000, // Amount in kobo
        callback_url: `http://localhost:3000/payment-success`
      };
      const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
        headers: {
          Authorization: `Bearer sk_test_28c2f770fed441b35961ba56066e5d6f32c5e5a0`,
          'Content-Type': 'application/json',
        },

    })
    const { authorization_url } = response.data.data;
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');

    console.log({ urlnew:  response.data.data });
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log({ urltest: response });
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');
    console.log('                ');


    console.log({ urlfinial: authorization_url });
    return NextResponse.json({ url: authorization_url });

  } catch (error) {
  
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: error || "An error occurred" });
  }
}