"use client"
import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
        <p className="text-lg text-gray-600">Learn more about our mission, team, and journey.</p>
      </div>

      {/* Mission Section */}
      <div className="bg-primary p-6 rounded-lg shadow-lg my-6">
        <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
        <p className="mt-2 text-gray-700">
          Our mission is to connect loving pet owners with the perfect companions. We strive to make pet adoption seamless and joyful for everyone.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-primary p-6 rounded-lg shadow-lg my-6">
        <h2 className="text-2xl font-semibold text-white">Meet Our Team</h2>
        <p className="mt-2 text-gray-700">
          We are a passionate team of animal lovers, developers, and adoption specialists dedicated to improving pet adoption experiences.
        </p>
      </div>

      {/* History Section */}
      <div className="bg-primary p-6 rounded-lg shadow-lg my-6">
        <h2 className="text-2xl font-semibold text-white">Our Journey</h2>
        <p className="mt-2 text-gray-700">
          Founded with a love for animals, our platform has helped numerous pets find their forever homes. We continue to innovate and improve adoption processes.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
