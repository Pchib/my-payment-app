"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (reference) {
      console.log({ frontend: reference });
      const fetchPaymentDetails = async () => {
        try {
          const response = await axios.get(`/api/verify-payment?reference=${reference}`);
          setPaymentDetails(response.data);
          console.log({ frontend: response.data });
          setLoading(false);
        } catch (error) {
          console.error('Payment verification failed:', error);
          console.log({ frontend: 'not working', error: error });
          setLoading(false);
        }
      };

      fetchPaymentDetails();
    }
  }, [reference]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Payment Successful please check your mail for you encoded qe code to access the video </h1>
      {paymentDetails && (
        <div>
          <p>Reference: {paymentDetails.reference}</p>
          <p>Status: {paymentDetails.status}</p>
          <p>Amount: {paymentDetails.amount / 100}</p>
          <p>Currency: {paymentDetails.currency}</p>
          {/* Display other relevant details */}
        </div>
      )}
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;
