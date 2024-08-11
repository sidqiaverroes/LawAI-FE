import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
