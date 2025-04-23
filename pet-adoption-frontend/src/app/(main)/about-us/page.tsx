"use client"
import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                <div
                    className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                    <div className="pt-48 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                        <img className="rounded-xl object-cover" src="https://cff2.earth.com/uploads/2019/07/08191128/The-personalities-of-animal-owners-are-reflected-in-their-pets.jpg" alt="about Us image" />
                    </div>
                    <img className="sm:ml-0 ml-auto rounded-xl object-cover" src="https://images.seattletimes.com/wp-content/uploads/2019/07/pethealth_0806.jpg?d=780x520"
                        alt="about Us image" />
                </div>
                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-center items-start gap-8 flex">
                        <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                            <h2
                                className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                Empowering Each Other to Succeed</h2>
                            <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center text-wrap">
                              Behind every adoption we've undertaken has been a collaborative effort, where every person involved has left their mark.

                              From the rescuers and caretakers to the volunteers and new pet parents, each story is a testament to the love, dedication, and shared mission of giving animals a second chance at life.
                            </p>
                        </div>
                        <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                            <div className="flex-col justify-start items-start inline-flex">
                                <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">9 <span className="text-base">of</span> 10</h3>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Recommend our services</h6>
                            </div>
                            <div className="flex-col justify-start items-start inline-flex">
                                <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">15000+</h4>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Adopted Pets</h6>
                            </div>
                            <div className="flex-col justify-start items-start inline-flex">
                                <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">10000+</h4>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                            </div>
                        </div>
                    </div>
                    <button
                        className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Read More</span>
                    </button>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-transparent py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-500">Compassion</h3>
              <p className="mt-4 text-lg text-gray-600">
                We believe in showing compassion to all animals, ensuring they are treated with love
                and respect.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-500">Community</h3>
              <p className="mt-4 text-lg text-gray-600">
                Our community of adopters, shelters, and volunteers work together to make a lasting
                difference in the lives of animals.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-500">Transparency</h3>
              <p className="mt-4 text-lg text-gray-600">
                We are committed to providing transparent processes and information to our users, so
                they can make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <img src="/images/team-member-1.jpg" alt="Team Member 1" className="rounded-full w-32 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
              <p className="text-lg text-gray-600">Founder & CEO</p>
              <p className="mt-4 text-gray-600">
                John has dedicated his career to improving animal welfare and creating a better world for pets.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <img src="/images/team-member-2.jpg" alt="Team Member 2" className="rounded-full w-32 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
              <p className="text-lg text-gray-600">Lead Adoption Specialist</p>
              <p className="mt-4 text-gray-600">
                Jane is passionate about helping animals find their forever homes and works closely with shelters.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
              <img src="/images/team-member-3.jpg" alt="Team Member 3" className="rounded-full w-32 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Sara Lee</h3>
              <p className="text-lg text-gray-600">Community Outreach</p>
              <p className="mt-4 text-gray-600">
                Sara connects with local communities and helps raise awareness about pet adoption programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-gray-600 italic">
                  "This platform made it so easy to find and adopt the perfect dog. Thank you for connecting
                  us with our new family member!"
                </p>
                <p className="mt-4 font-semibold">Emily & Max</p>
                <p className="text-sm text-gray-500">Adopted a dog</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-gray-600 italic">
                  "A wonderful experience from start to finish. The team at this site made the adoption process so simple and stress-free."
                </p>
                <p className="mt-4 font-semibold">Tom & Lucy</p>
                <p className="text-sm text-gray-500">Adopted a cat</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg text-gray-600 italic">
                  "I love how easy it is to find animals that fit my lifestyle and preferences. Highly recommend!"
                </p>
                <p className="mt-4 font-semibold">Mark & Bella</p>
                <p className="text-sm text-gray-500">Adopted a rabbit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600">
            We’d love to hear from you. Whether you have a question or want to learn more about our
            mission, reach out today!
          </p>
          <a
            href="mailto:contact@petadoption.com"
            className="inline-block mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg"
          >
            Contact Us
          </a>
        </div>
      </section>                                  
    </div>
  );
};

export default AboutUs;
