'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center bg-green-50 p-4"
    >
      <motion.h1
        className="text-3xl font-bold text-green-700 mb-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        🎉 Form Submitted Successfully!
      </motion.h1>

      <p className="text-lg text-gray-700 mb-6">Thank you for reaching out to us.</p>

      <Link href="/" className="text-blue-600 underline hover:text-blue-800">
        ← Go Back to Home
      </Link>
    </motion.div>
  );
}
