import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Link from 'next/link';

export default function Contact() {
  return (
    <main>
      <Navbar />
      <div className="bg-cream py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="seth-heading text-seth-coral mb-8">
            Let's talk about your project
          </h1>

          <p className="text-xl text-dark-gray mb-8">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-dark-gray mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-seth-coral"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-dark-gray mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-seth-coral"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-dark-gray mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-seth-coral"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-dark-gray mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-seth-coral"
                placeholder="Tell me about your project"
              ></textarea>
            </div>

            <div>
              <button type="submit" className="bg-seth-coral text-white py-3 px-6 rounded-full hover:bg-seth-coral/90 transition-colors">
                Send message
              </button>
            </div>
          </form>

          <div className="mt-12">
            <p className="text-dark-gray">
              Prefer email? Reach me directly at{' '}
              <a href="mailto:hey@getseth.com" className="text-seth-coral hover:underline">
                hey@getseth.com
              </a>
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-seth-coral hover:underline flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
