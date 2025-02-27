'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Gallery from '@/src/components/Gallery';
import Image from 'next/image';
import TypingEffect from '../components/TypingEffect';

export default function Home() {

  const fadeInOut = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: "easeInOut" } 
    },
    hidden: { 
      opacity: 0, 
      y: 100, 
      transition: { duration: 1.2, ease: "easeInOut" } 
    },
  };

  const Section = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '-100px', once: false });

    return (
      <motion.div
        ref={ref}
        variants={fadeInOut}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="h-screen flex flex-col justify-center text-center"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <Section>
        <div className='flex flex-row justify-between w-full'>
          <div className="chat chat-end w-full h-full items-center">
            <div className="flex flex-col w-full rounded-badge chat-bubble p-4">
              <TypingEffect text={
                "  Welcome to Gobi, where loving pets find their perfect forever homes! Whether you're looking for a loyal dog, a playful cat, or a small furry friend, we connect you with adoptable pets that match your lifestyle. Our platform makes it easy to search by species, breed, age, and personality to find the perfect companion. We work with trusted shelters and rescues to ensure every pet gets the love and care they deserve. Create a profile, set your preferences, and start your journey toward adopting a new best friend today. Together, we can give every pet a second chance at happiness. Start exploring and find your perfect match!"
              }/>
            </div>
          </div>

          <div className="w-full">
            <img className="w-full" src="https://pngimg.com/d/dog_PNG50375.png" alt="dummy-image" />
          </div>
        </div>
        
      </Section>

      {/* About Section */}
      <Section>
        <h2 className="text-4xl font-semibold mb-6">About Gobi</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Gobi helps connect pets with loving families. Our mission is to ensure every pet finds a home.
        </p>
        <div className='flex flex-row self-center gap-3 my-3'>
          <button type="button" className='btn btn-outline rounded-full'>Adopt a pet</button><button type="button" className='btn btn-outline rounded-full'>Set a pet for adoption</button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <h2 className="text-4xl font-semibold mb-6">Testimonials</h2>
        <p>See how we&apos;ve helped match pets with loving owners.</p>
        <button type="button" className='size-fit self-center btn btn-outline my-6'>Give us feedback!</button>
        <article className='flex flex-col content-start'>
          <hr />
          <div className="my-3 size-fit">
              <div className="font-medium">
                  <p className='text-xl'>Jese Leos</p>
              </div>
          </div>
          <div className="flex items-center my-3 space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <h3 className="ms-2 text-sm font-semibold text-ellipsis">Thinking to adopt another one!</h3>
          </div>
          <div>
              <p className="my-3 text-gray-500 dark:text-gray-400 text-ellipsis line-clamp-3">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
          </div>
          <hr />
        </article>
        <article className='flex flex-col content-start'>
          <hr />
          <div className="my-3 size-fit">
              <div className="font-medium">
                  <p className='text-xl'>Jese Leos</p>
              </div>
          </div>
          <div className="flex items-center my-3 space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <h3 className="ms-2 text-sm font-semibold text-ellipsis">Thinking to adopt another one!</h3>
          </div>
          <div>
              <p className="my-3 text-gray-500 dark:text-gray-400 text-ellipsis line-clamp-3">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
          </div>
          <hr />
        </article>
      </Section>

      {/* Call to Action */}
      <Section>
        <h2 className="text-4xl font-semibold mb-6">Ready to Make a Difference?</h2>
        <p className="py-3 px-8 text-xl">Join the Gobi Community</p>
        <button type="button" className='btn btn-outline size-fit self-center'>Login now!</button>
      </Section>
    </div>
  );
}