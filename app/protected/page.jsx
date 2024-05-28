"use client"
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProtectedContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (email === 'ugwuisaaciu@gmail.com') {
      setValid(true);
    }
  }, [email]);

  if (!valid) {
    return <p>Invalid access</p>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <video width="600" controls>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProtectedContent />
    </Suspense>
  );
}
