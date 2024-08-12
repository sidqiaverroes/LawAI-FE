import { Inter } from "next/font/google";
import React, { useState } from 'react';
import SearchBar from "@/components/SearchBar";
import ResultComponent from '@/components/ResultComponent';
import ChatRooms from '@/components/ChatRooms'; // Import the ChatRooms component
import 'antd/dist/reset.css';
import ProtectedPage from "@/components/ProtectedPage";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiResponse = (data) => {
    setApiResponse(data);
  };

  return (
    <div className={`${inter.className} bg-putih`}>
      <main className="flex flex-col items-center justify-start min-h-screen mt-12 px-4">
        {/* <div className="mt-12">
          <ChatRooms />
        </div> */}
        <span className="py-20">
          <SearchBar onApiResponse={handleApiResponse} />
        </span>

        {apiResponse && <ResultComponent data={apiResponse} />}
        
        {/* Add ChatRooms component here */}
      </main>
    </div>
  );
};

export default ProtectedPage(Home);
