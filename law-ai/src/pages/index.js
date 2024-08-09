import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/SearchBar"; // Import the SearchBar component
import ResultComponent from '@/components/ResultComponent';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are applied

const inter = Inter({ subsets: ["latin"] });

const summary = `
## Legal Summary

This section contains the summary of the legal information. It supports **bold** and *italic* formatting.

- Point 1
- Point 2
`;

const jsonData = {
  "full_answers": `
# Legal Summary

This section contains the summary of the legal information. It supports **bold** and *italic* formatting.

- Point 1
- Point 2
`,
  "laws": [
    { "jawaban": "lorem ipsum jawaban", "judul_uu": "lorem ipsum judul", "bab": "lorem ipsum bab", "pasal": "lorem ipsum ayat" },
    { "jawaban": "lorem ipsum jawaban 2", "judul_uu": "lorem ipsum judul 2", "bab": "lorem ipsum bab 2", "pasal": "lorem ipsum ayat 2" }
  ]
};

export default function Home() {
  return (
    <div className={`${inter.className} bg-putih `}>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        {/* <h1 className="text-4xl font-bold mb-4 text-gray-600">Selamat Datang di Law AI!</h1>
        <p className="text-lg mb-6 text-gray-500">Aplikasi ini membantu Anda untuk konsultasi seputar hukum di Indonesia.</p> */}
        
        <span className="pb-20">
          <SearchBar />
        </span>

        
        <ResultComponent data={jsonData} />
      </main>
    </div>
  );
}