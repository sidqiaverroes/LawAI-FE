// components/Layout.js
import React from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar'; // Adjust the import path as needed

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname === '/auth'; // Adjust the path based on your auth page

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />} {/* Conditionally render Navbar */}
      <main className="flex-1">
        {children}
      </main>
      {/* Optionally, add a footer here */}
    </div>
  );
};

export default Layout;
