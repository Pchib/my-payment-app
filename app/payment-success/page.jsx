// pages/payment-success.js
"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (reference) {
      const fetchPaymentDetails = async () => {
        try {
          const response = await axios.get(`/api/verify-payment?reference=${reference}`);
          setPaymentDetails(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Payment verification failed:', error);
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
      <h1>Payment Successful</h1>
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

export default PaymentSuccess;
