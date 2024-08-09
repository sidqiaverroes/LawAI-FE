import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/SearchBar"; // Import the SearchBar component
import 'antd/dist/reset.css'; // Ensure Ant Design styles are applied

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-putih">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">Selamat Datang di Law AI!</h1>
        <p className="text-lg mb-6 text-gray-500">Aplikasi ini membantu Anda untuk konsultasi seputar hukum di Indonesia.</p>
        
        <span className="pb-20">
          <SearchBar />
        </span>
        
      </main>
    </div>
  );
}