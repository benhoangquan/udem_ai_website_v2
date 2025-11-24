import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/common/Navbar';

// Placeholder Substack URL - replace with actual Substack URL
const SUBSTACK_URL = 'https://substack.com/placeholder';

export default function ResourcesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Substack
    window.location.href = SUBSTACK_URL;
  }, []);

  return (
    <>
      <Head>
        <title>Resources | UdeM AI</title>
        <meta name="description" content="Find resources on our Substack" />
        <meta httpEquiv="refresh" content={`0;url=${SUBSTACK_URL}`} />
      </Head>
      <Navbar />
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="seth-heading text-seth-coral mb-4">Redirecting to Resources...</h1>
          <p className="seth-heading-2 text-seth-coral mb-6">
            You will be redirected to our Substack resources shortly.
          </p>
          <a
            href={SUBSTACK_URL}
            className="text-seth-coral underline hover:opacity-80"
          >
            Click here if you are not redirected automatically
          </a>
        </div>
      </div>
    </>
  );
}
