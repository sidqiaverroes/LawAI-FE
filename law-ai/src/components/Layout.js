import React from 'react';
import Navbar from './navbar'; // Adjust the import path as needed

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {/* Optionally, add a footer here */}
    </div>
  );
};

export default Layout;
