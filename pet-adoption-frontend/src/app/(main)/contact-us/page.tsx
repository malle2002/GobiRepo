"use client"

import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div className='relative'>
      <img src="https://healthypetshq.com/cdn/shop/files/1600x1000_banner_new.jpg?v=1720305351&width=1600" className="absolute inset-0 w-[75%] mx-auto h-full object-cover rounded-badge" />

      <div className="container mx-auto py-5 px-10 my-8 w-3/4 lg:w-1/2 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-opacity-25"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-opacity-25"
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input input-bordered w-full bg-opacity-25"
              placeholder="Inquiry"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-opacity-25 font-semibold text-black"
              placeholder="Your message..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn bg-transparent w-full text-white hover:bg-opacity-25">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default ContactPage;
