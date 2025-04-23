'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Testimonials from '../components/Testimonials';
import Lenis from 'lenis';

export default function Home() {
  const [enableAnimation, setEnableAnimation] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    setEnableAnimation(isDesktop);

    const lenis = new Lenis();
    function raf(time:any) {
      lenis.raf(time)
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [])

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

    if (!enableAnimation) {
      // Disable motion.div animation on mobile
      return (
        <div ref={ref} className="flex flex-col justify-center text-center">
          {children}
        </div>
      );
    }

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
    <div className="container mx-auto">
      <Section>
        <div className="mx-auto grid max-w-7xl gap-20 px-5 py-10 lg:grid-cols-2 lg:gap-5 lg:py-20">
          <div>
            <div className="relative text-3xl font-bold leading-tight md:text-5xl xl:text-7xl">
              <h1 className="min-h-[6rem] text-center"><span className="relative z-20">Find Your Furry Companion</span><span> </span><span className="relative">With Gobi<img className="absolute -bottom-2 left-0 z-10 w-40 md:-bottom-4 md:w-60 xl:-bottom-6 xl:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg" alt="" data-dont-replace=""/></span><span> </span><span className="relative z-20">Today!</span></h1>
            </div>
            <p className="pb-9 pt-4 text-lg font-light text-[var(--gray-text-color)]">Gobi connects you with loving pets in need of a forever home, ensuring a seamless and joyful adoption experience.</p>
            <div className="relative flex flex-col items-start gap-4 pb-24 sm:flex-row md:items-center md:gap-10"><a href="/available-pets" className="self-center inline-block rounded-[var(--button-rounded-radius)] rounded-br-none border border-[var(--primary-button-bg-color)] bg-[var(--primary-button-bg-color)] px-8 py-4 text-lg text-[var(--primary-button-text-color)] transition ease-linear hover:bg-base-content hover:text-white">Adopt Now</a><a className="group flex items-center gap-2 border-b border-base-content p-2 transition ease-linear md:p-4 lg:hover:border-transparent self-center" href="/adoption-process"><span className="text-lg font-thin">Learn How to Adopt</span><i className="fa-regular fa-arrow-up-right text-[var(--primary-color)]" aria-hidden="true"></i></a><img className="absolute right-0 top-10 z-10 w-20 md:w-auto xl:top-0" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape.svg" alt="curve shape" data-dont-replace=""/></div>
              <div className="grid gap-11 sm:grid-cols-2">
                <div className="relative">
                  <div className="flex items-center gap-2.5 pb-3"><img className="h-10 w-10 overflow-hidden rounded-full object-cover" src="https://media.gettyimages.com/id/1309489745/photo/portrait-of-young-happy-indian-business-man-executive-looking-at-camera-eastern-male.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=K1pIuZ-758hZpczvQSLjxvyqeOwy5t5EklPn_ykBHfo=" alt="avatar" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;1309489745&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"/>
                    <p className="text-lg font-semibold opacity-80">Sarah Thompson</p>
                  </div>
                  <div className="flex items-center gap-3 pb-3 md:pb-6">
                    <div className="flex items-center gap-0.5"><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i></div>
                  </div>
                  <p className="text-sm font-thin text-[var(--gray-text-color)]">Gobi made the adoption process straightforward and fulfilling. Our new dog is a perfect addition to our family!</p><img className="dont-replace absolute -top-5 right-0 z-10" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace=""/>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2.5 pb-3"><img className="h-10 w-10 overflow-hidden rounded-full object-cover" src="https://media.gettyimages.com/id/1450340623/photo/portrait-of-successful-mature-boss-senior-businessman-in-glasses-asian-looking-at-camera-and.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=_3BHqzEwN7yDJ5o41g1ofHVbEp1NYbcqisUY_Sd1eyA=" alt="avatar" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;1450340623&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"/>
                    <p className="text-lg font-semibold opacity-80">James Carter</p>
                  </div>
                  <div className="flex items-center gap-3 pb-3 md:pb-6">
                    <div className="flex items-center gap-0.5"><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i></div>
                  </div>
                  <p className="text-sm font-thin text-[var(--gray-text-color)]">Thanks to Gobi, we found the most affectionate cat who has brought so much joy into our lives!</p><img className="absolute -top-5 right-0 z-10" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace=""/>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-5 gap-x-8 gap-y-4 lg:pl-20">
              <div className="relative col-span-2">
                <div><img className="absolute -right-8 bottom-4 z-10 w-24 sm:right-0 sm:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-bubble.svg" alt=""/>
                  <p className="absolute -right-1 bottom-14 z-10 -rotate-[25deg] text-xl font-semibold text-white/80 sm:bottom-20 sm:right-10 sm:text-4xl lg:text-3xl xl:text-4xl">Easy</p>
                </div><img className="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace=""/>
              </div>
              <div className="relative col-span-3"><img className="relative z-20 h-40 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:h-48" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/f1cf2a5d-1960-465b-6500-03e19986c300/public" alt="cute domestic cats and dogs of various colors run through a summer sunny meadow" data-landingsite-gallery-type="image" data-media="{&quot;id&quot;:&quot;1845512061&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"/>
                <div className="absolute inset-0 z-[1] h-40 w-full -translate-y-2 translate-x-2 rounded-[30px] bg-[var(--primary-color)] sm:h-48"></div>
              </div>
              <div className="relative col-span-5">
                <img className="relative z-20 h-64 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:h-[340px]" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/94187a21-93e5-4b8b-c6a8-d3d303584600/public" alt="Portrait of beagle dog playing with Asian young woman on sofa in living room at cozy home. Pet and cute animal concept." data-landingsite-gallery-type="image" data-seo-image="" data-media="{&quot;id&quot;:&quot;2169620101&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"/>
              <div className="absolute inset-0 z-10 h-64 w-full translate-x-2 translate-y-2 rounded-[30px] bg-[var(--primary-color)] sm:h-[340px]"></div><img className="absolute -left-6 -top-6 z-30 w-16 sm:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-dots.svg" alt="" data-dont-replace=""/><img className="absolute -bottom-10 -right-10 z-30 w-16 sm:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-dots.svg" alt="" data-dont-replace=""/>
            </div>
            <div className="relative col-span-3 sm:col-span-2"><img className="relative z-20 h-32 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] xl:h-40" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/5789707c-c106-4049-bc07-9aebcf5f0d00/publicContain" alt="Dog with pumpkins. Shetland Sheepdog. Thanksgiving day. Fall season. Halloween holidays. Sheltie dog breed" data-landingsite-gallery-type="image" data-media="{&quot;id&quot;:&quot;1718625820&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}"/>
              <div className="absolute inset-0 z-[1] h-32 w-full -translate-y-1 translate-x-1 rounded-[30px] bg-[var(--primary-color)] xl:h-40"></div>
            </div>
            <div className="relative col-span-2 sm:col-span-3"><img className="absolute -left-8 top-4 z-10 w-28 sm:left-0 sm:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/yellow-bubble.svg" alt="" data-dont-replace=""/>

            <p className="absolute left-0 top-12 z-10 rotate-[28deg] text-xl sm:left-8 sm:text-2xl">Fun :)</p><img className="absolute right-0 top-4 z-10 sm:left-32" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace=""/><img className="absolute -bottom-10 right-0 z-10 hidden sm:block xl:bottom-0" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-curve-shape.svg" alt="" data-dont-replace=""/>
          </div>
          <div className="absolute -right-20 left-0 top-1/2 h-[590px] -translate-y-1/2 rounded-3xl bg-[var(--light-background-color)]"></div>
          </div>
        </div>
      </Section>

      {/* <Section>
        <div>
          <div className="relative text-3xl font-bold leading-tight md:text-5xl xl:text-7xl">
            <h1 className="min-h-[6rem] pr-24 [font-family:var(--font-family-heading)]"><span className="relative z-20">Find Your Perfect Companion</span><span> </span><span className="relative">With Gobi<img className="absolute -bottom-2 left-0 z-10 w-40 md:-bottom-4 md:w-60 xl:-bottom-6 xl:w-auto" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg" alt="" data-dont-replace="" /></span><span> </span><span className="relative z-20">Start Your Adoption Journey</span></h1>
            <p className="pb-9 pt-4 text-lg font-light text-[var(--gray-text-color)]">Gobi connects loving homes with pets in need, providing an easy-to-navigate platform for adopting or listing pets. Discover the joy of pet companionship or help a furry friend find their forever home.</p>
            <div className="relative flex flex-col items-start gap-4 pb-24 sm:flex-row md:place-content-center md:gap-10">
              <a href="/add-your-pet" className="inline-block rounded-full border-t btn-outline px-8 py-4 text-lg transition ease-linear">
                List Your Pet
              </a>
              <a className="rounded-full group flex items-center gap-2 border-b border-black p-2 transition ease-linear md:p-4 hover:bg-base-content hover:text-white" href="/adopt-a-pet">
                <span className="text-lg font-thin">Browse Available Pets</span>
                <i className="fa-regular fa-arrow-up-right text-[var(--primary-color)]" aria-hidden="true"/>
              </a>
              <img className="absolute right-0 top-10 z-10 w-20 md:w-auto xl:top-0" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape.svg" alt="curve shape" data-dont-replace="" />
            </div>
            <div className="grid gap-11 sm:grid-cols-2">
              <div className="relative">
                <div className="flex items-center gap-2.5 pb-3"><img className="h-10 w-10 overflow-hidden rounded-full object-cover" src="https://media.gettyimages.com/id/2156062809/photo/headshot-closeup-portrait-middle-eastern-israel-businesswoman-business-lady-standing-isolated.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=mPEqaET5s98W_40DmBTRbYY5z0F-_1YkqdC4TCHJeig=" alt="avatar" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;2156062809&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
                  <p className="text-lg font-semibold opacity-80">Jessica Taylor</p>
                </div>
                <div className="flex items-center gap-3 pb-3 md:pb-6">
                  <div className="flex items-center gap-0.5"><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i></div>
                </div>
                <p className="text-sm font-thin text-[var(--gray-text-color)]">Gobi made it incredibly simple to find my new best friend! The process was smooth and I felt supported every step of the way.</p><img className="dont-replace absolute -top-5 right-0 z-10" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace="" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2.5 pb-3"><img className="h-10 w-10 overflow-hidden rounded-full object-cover" src="https://media.gettyimages.com/id/1309489745/photo/portrait-of-young-happy-indian-business-man-executive-looking-at-camera-eastern-male.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=K1pIuZ-758hZpczvQSLjxvyqeOwy5t5EklPn_ykBHfo=" alt="avatar" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;1309489745&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
                  <p className="text-lg font-semibold opacity-80">David Kim</p>
                </div>
                <div className="flex items-center gap-3 pb-3 md:pb-6">
                  <div className="flex items-center gap-0.5"><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i><i className="fa-solid fa-star text-yellow-500" aria-hidden="true"></i></div>
                </div>
                <p className="text-sm font-thin text-[var(--gray-text-color)]">Listing my pet on Gobi was straightforward, and I found a great family for my dog in no time!</p><img className="absolute -top-5 right-0 z-10" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace="" />
              </div>
            </div>
          </div>
        </div>
      </Section> */}

      <Section>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
        <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
          <div className="relative">
            <h1 className="text-4xl/normal font-bold [font-family:var(--font-family-heading)] lg:text-5xl/normal xl:text-6xl/normal">Discover Your New Furry Friend</h1><img className="absolute left-12 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:top-20" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg" alt="" data-dont-replace="" />
          </div>
          <p className="font-thin text-[var(--gray-text-color)] lg:pl-20 lg:text-lg">Gobi simplifies the pet adoption process, bridging the gap between loving families and animals in need. Whether you're looking to adopt a playful puppy or a wise old cat, our platform makes finding your ideal companion a seamless experience.</p><img className="absolute left-1/2 top-32 z-10 hidden -translate-x-1/2 lg:block xl:top-40" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape-easy.svg" alt="" data-dont-replace="" />
        </div>
        <div className="grid gap-9 pt-10 lg:grid-cols-3 lg:pt-28">
          <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 xl:px-9 xl:pt-12">
            <h3 className="text-2xl md:text-3xl xl:text-4xl"><span>Say goodbye to</span><span> </span><span className="text-[var(--primary-color)]">endless searching</span><span> </span><span>for pets</span></h3>
            <p className="pt-4 text-lg font-thin">With our user-friendly search tools, you can quickly filter through a variety of pets based on breed, size, and temperament to find the perfect match for your lifestyle.</p><img className="absolute bottom-4 left-4 h-[100px] w-[105px]" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/swirl.svg" alt="" />
            <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32">
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                <div className="text-[var(--primary-color)] text-3xl"><i className="fa-regular fa-magnifying-glass" aria-hidden="true"></i></div>
                <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
                shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
                shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 lg:pb-12 lg:pt-40 xl:px-9">
            <h3 className="text-2xl md:text-3xl xl:text-4xl"><span>Effortlessly</span><span> </span><span className="text-[var(--primary-color)]">list your pet</span><span> </span><span>for adoption</span></h3>
            <p className="pt-4 text-lg font-thin">Our platform enables pet owners to showcase their pets with ease, providing all the necessary details and photos to attract potential adopters in no time.</p><img className="absolute bottom-10 left-10 h-[76px] w-[82px] lg:top-10" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/globe.svg" alt="" data-dont-replace="" />
            <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32 lg:top-0 lg:items-start lg:rounded-bl-3xl lg:rounded-tl-none">
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                <div className="text-[var(--primary-color)] text-3xl"><i className="fa-regular fa-magnifying-glass" aria-hidden="true"></i></div>
                <div className="absolute -bottom-16 right-0 z-10 hidden h-12 w-6 rounded-tr-3xl bg-gray-200 shadow-[0_-25px_0_0_#faf8f4]
                lg:block"></div>
                <div className="absolute -left-10 top-0 z-10 hidden h-12 w-6 rounded-tr-3xl bg-gray-200 shadow-[0_-25px_0_0_#faf8f4] lg:block"></div>
                <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]
                lg:hidden"></div>
                <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]
                lg:hidden"></div>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 xl:px-9 xl:pt-12">
            <h3 className="text-2xl md:text-3xl xl:text-4xl"><span>Your satisfaction is</span><span> </span><span className="text-[var(--primary-color)]">our priority</span><span> </span><span>every step of the way</span></h3>
            <p className="pt-4 text-lg font-thin">Gobi is dedicated to providing ongoing support throughout your adoption journey, ensuring that both pets and adopters have the resources they need for a successful match.</p><img className="absolute bottom-6 left-6 h-[85px] w-[83px]" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/arrow.svg" alt="" data-dont-replace="" />
            <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32">
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                <div className="text-[var(--primary-color)] text-3xl"><i className="fa-regular fa-magnifying-glass" aria-hidden="true"></i></div>
                <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
                shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
                shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
          <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
            <div className="relative">
              <h1 className="pr-12 text-4xl/normal font-bold [font-family:var(--font-family-heading)] lg:text-5xl/normal xl:text-6xl/normal">Why Choose Gobi for Pet Adoption?</h1><img className="absolute left-12 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:top-20" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg" alt="" data-dont-replace="" /><img className="absolute right-0 top-0 z-10 block md:top-4 lg:block xl:w-16" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg" alt="" data-dont-replace="" />
            </div>
            <p className="font-thin lg:pl-20 lg:text-lg">Gobi transforms the pet adoption experience by connecting loving families with pets seeking a forever home. Our intuitive platform allows you to seamlessly search for your perfect companion or list your pet for adoption, ensuring each animal finds the love they deserve. With Gobi, you’re not just adopting; you’re making a lifelong commitment to a furry friend.</p><img className="absolute right-0 top-40 z-10 hidden lg:block" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape-choose.svg" alt="" data-dont-replace="" />
          </div>
          <div className="relative mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 lg:mt-28">
            <div className="relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl bg-primary p-6 text-[var(--primary-button-text-color)] md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10">
              <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">1,500+</h1>
              <p className="text-center text-sm font-thin md:text-base lg:text-lg">Pets Awaiting Adoption</p>
            </div>
            <div className="relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl bg-primary p-6 text-[var(--primary-button-text-color)] md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10">
              <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">500+</h1>
              <p className="text-center text-sm font-thin md:text-base lg:text-lg">Successful Adoptions This Month</p>
            </div>
            <div className="relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl bg-primary p-6 text-[var(--primary-button-text-color)] md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10">
              <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">35+</h1>
              <p className="text-center text-sm font-thin md:text-base lg:text-lg">States with Loving Families</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
        <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
        <div className="relative">
          <h1 className="text-4xl/normal font-bold [font-family:var(--font-family-heading)] lg:text-5xl/normal xl:text-6xl/normal">Essential Resources for Pet Adoption</h1><img className="absolute left-32 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:left-52 xl:top-20" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg" alt="" data-dont-replace="" />
        </div>
        <p className="font-thin lg:pl-20 lg:text-lg">Searching for a furry friend or looking to give your pet a new home? Gobi streamlines the pet adoption journey, creating a simple yet effective platform for both prospective adopters and pet owners. Experience the joy of connecting with animals in need of loving families.</p><img className="absolute left-1/2 top-0 z-10 hidden h-[76px] w-[72px] -translate-x-1/2 lg:block" src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/star.svg" alt="" data-dont-replace="" />
        </div>
        <div className="grid gap-5 pt-10 lg:grid-cols-3 lg:gap-9 lg:pt-28">
        <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8"><img className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/406d74d0-2e64-4ee2-353a-1d97f7b38900/public" alt="" data-landingsite-gallery-type="image" data-media="{&quot;id&quot;:&quot;2091237193&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
          <h3 className="pt-8 text-xl font-bold text-black/80">Transforming Adoption Stories: My Journey with Gobi</h3>
          <p className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8">Learn how Gobi helped me find my beloved companion in just a matter of days.</p>
          <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
              <div className="text-3xl text-[var(--primary-color)]"><i className="fa-regular fa-heart" aria-hidden="true"></i></div>
              <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
              <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
            </div>
          </div>
        </div>
        <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8"><img className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/ed2a442d-a55f-407d-9e37-39e043c69600/public" alt="" data-landingsite-gallery-type="image" data-media="{&quot;id&quot;:&quot;1516239450&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
          <h3 className="pt-8 text-xl font-bold text-black/80">Your Complete Guide to Finding a Pet</h3>
          <p className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8">A must-read resource for first-time adopters, filled with tips and insights.</p>
          <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
              <div className="text-3xl text-[var(--primary-color)]"><i className="fa-regular fa-book" aria-hidden="true"></i></div>
              <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
              <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
            </div>
          </div>
        </div>
        <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8"><img className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/8e23d9d1-ebda-4827-a290-b0325af7a700/public" alt="" data-landingsite-gallery-type="image" data-media="{&quot;id&quot;:&quot;1885088156&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
          <h3 className="pt-8 text-xl font-bold text-black/80">Engaging with Your New Pet: Tips and Tricks</h3>
          <p className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8">Explore effective strategies to nurture and bond with your new furry family member.</p>
          <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
              <div className="text-3xl text-[var(--primary-color)]"><i className="fa-regular fa-paw" aria-hidden="true"></i></div>
              <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
              <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200
              shadow-[0_15px_0_0_#faf8f4]"></div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <Testimonials/>
      </Section>

      <div className='mt-10' />
    </div>
  );
}