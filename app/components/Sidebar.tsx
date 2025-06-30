'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 p-4 bg-[#0d0805]  text-white">
      <div className="flex flex-col space-y-2 h-screen">
        <Link
          href="/"
          className={`font-semibold px-3 py-2 rounded ${
            pathname === '/' ? 'bg-blue-600 text-white' : 'text-white hover:bg-blue-100'
          }`}>
          Contact Form
        </Link>

        <Link
          href="/feedback"
          className={`font-semibold px-3 py-2 rounded ${
            pathname === '/feedback' ? 'bg-blue-600 text-white' : 'text-white hover:bg-blue-100'
          }`} >
          Feedback Form
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
