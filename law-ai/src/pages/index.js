import { Inter } from "next/font/google";
import React, { useState } from 'react';
import SearchBar from "@/components/SearchBar"; // Import the SearchBar component
import ResultComponent from '@/components/ResultComponent';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are applied
import ProtectedPage from "@/components/ProtectedPage";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiResponse = (data) => {
    setApiResponse(data);
  };

  return (
    <div className={`${inter.className} bg-putih `}>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        <span className="py-20">
          <SearchBar onApiResponse={handleApiResponse} />
        </span>

        {apiResponse && <ResultComponent data={apiResponse} />}
      </main>
    </div>
  );
}

export default ProtectedPage(Home);
