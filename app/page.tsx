'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    service: '',
    contactType: '',
    feedback: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' })); // clear error on change
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // ✅ Mobile validation
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      errors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (!formData.service) errors.service = 'Please select a service';
    if (!formData.contactType) errors.contactType = 'Please select a contact method';
    if (!formData.feedback.trim()) errors.feedback = 'Feedback is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

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
      const timer = setTimeout(() => setShowSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const getInputStyle = (field: string, value: string) => {
    if (formErrors[field]) return 'border-red-500';
    if (value.trim()) return 'border-green-500';
    return 'border-gray-300';
  };

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
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:outline-blue-500   ${getInputStyle(
                'firstName',
                formData.firstName
              )}`}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:outline-blue-500  ${getInputStyle(
                'lastName',
                formData.lastName
              )}`}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className={`w-full border rounded px-3 py-2 focus:outline-none   ${getInputStyle(
              'email',
              formData.email
            )}`}
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // remove non-numeric
              if (value.length <= 10) {
                setFormData(prev => ({ ...prev, mobile: value }));
                setFormErrors(prev => ({ ...prev, mobile: '' }));
              }
            }}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:outline-blue-500  ${getInputStyle(
              'mobile',
              formData.mobile
            )}`}
          />
          {formErrors.mobile && <p className="text-red-500 text-sm mt-1">{formErrors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Service</label>
          <select
            name="service"
            onChange={handleChange}
            value={formData.service}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:outline-blue-500  ${getInputStyle(
              'service',
              formData.service
            )}`} >

            <option value="">-- Select --</option>
            <option value="web">Web Development</option>
            <option value="design">UI/UX Design</option>
            <option value="marketing">Digital Marketing</option>
          </select>
          {formErrors.service && <p className="text-red-500 text-sm mt-1">{formErrors.service}</p>}
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
          {formErrors.contactType && (
            <p className="text-red-500 text-sm mt-1">{formErrors.contactType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Feedback</label>
          <textarea
            name="feedback"
            onChange={handleChange}
            value={formData.feedback}
            rows={4}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:outline-blue-500  ${getInputStyle(
              'feedback',
              formData.feedback
            )}`}
            placeholder="Share your feedback..."
          />
          {formErrors.feedback && (
            <p className="text-red-500 text-sm mt-1">{formErrors.feedback}</p>
          )}
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

export default Home;
