import { Inter } from "next/font/google";
import React, { useState } from 'react';
import SearchBar from "@/components/SearchBar";
import ResultComponent from '@/components/ResultComponent';
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
      <main className="flex flex-col items-center justify-start min-h-screen my-12 px-4">
        {/* <div className="mt-12">
          <ChatRooms />
        </div> */}
        <span className="pt-20 pb-12">
          <SearchBar onApiResponse={handleApiResponse} />
        </span>

        {apiResponse && <ResultComponent data={apiResponse} />}
      </main>
    </div>
  );
};

export default ProtectedPage(Home);
