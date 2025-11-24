import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/common/Navbar';

// Placeholder Substack URL - replace with actual Substack URL
const SUBSTACK_URL = 'https://substack.com/placeholder';

const BlogIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Substack
    window.location.href = SUBSTACK_URL;
  }, []);

  return (
    <>
      <Head>
        <title>Blog | UdeM AI</title>
        <meta name="description" content="Read our latest blog posts on Substack" />
        <meta httpEquiv="refresh" content={`0;url=${SUBSTACK_URL}`} />
      </Head>
      <Navbar />
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="seth-heading text-seth-coral mb-4">Redirecting to Blog...</h1>
          <p className="seth-heading-2 text-seth-coral mb-6">
            You will be redirected to our Substack blog shortly.
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
};

export default BlogIndex;
