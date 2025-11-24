import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/common/Navbar';
import { useTranslations } from 'next-intl';
import { GetStaticProps, GetStaticPaths } from 'next';
import { locales } from '@/i18n/config';

// Placeholder Substack URL - replace with actual Substack URL
const SUBSTACK_URL = 'https://substack.com/placeholder';

const BlogIndex = () => {
  const router = useRouter();
  const t = useTranslations('blog');

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
          <h1 className="seth-heading text-seth-coral mb-4">{t('redirecting')}</h1>
          <p className="seth-heading-2 text-seth-coral mb-6">
            {t('message')}
          </p>
          <a
            href={SUBSTACK_URL}
            className="text-seth-coral underline hover:opacity-80"
          >
            {t('clickHere')}
          </a>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

export default BlogIndex;

