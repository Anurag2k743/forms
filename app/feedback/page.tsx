'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('rating', String(rating));
      formData.append('feedback', feedback);
      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('/api/feedback', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('✅ Thank you! Your feedback was sent.');
        setRating(0);
        setFeedback('');
        setFile(null);
      } else {
        alert('❌ Failed to send feedback.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('⚠️ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-2xl rounded-xl p-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">We Value Your Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={28}
              className={`cursor-pointer transition-colors ${
                (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Feedback Textarea */}
        <div className="relative">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            Tell us about your experience
          </label>
        </div>

        {/* File Upload */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">Upload Screenshot (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-gray-600 bg-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
            } text-white font-semibold py-3 rounded-lg shadow transition`}
          >
            {loading ? 'Sending...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
