'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    service: '',
    contactType: '',
    feedback: '',
  });



  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          service: '',
          contactType: '',
          feedback: '',
        });
      } else {
        alert('Something went wrong!');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            onChange={handleChange}
            value={formData.mobile}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Service</label>
          <select
            name="service"
            onChange={handleChange}
            value={formData.service}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">-- Select --</option>
            <option value="web">Web Development</option>
            <option value="design">UI/UX Design</option>
            <option value="marketing">Digital Marketing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="contactType"
                value="email"
                onChange={handleChange}
                checked={formData.contactType === 'email'}
                className="mr-2"
              />
              Email
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="contactType"
                value="phone"
                onChange={handleChange}
                checked={formData.contactType === 'phone'}
                className="mr-2"
              />
              Phone
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Feedback</label>
          <textarea
            name="feedback"
            onChange={handleChange}
            value={formData.feedback}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Share your feedback..."
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* ✅ Show success message below the form */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-green-600 text-white px-5 py-3 rounded shadow text-center"
          >
            ✅ Form submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default home;
