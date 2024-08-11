import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedPage = (WrappedComponent) => {
  return (props) => {
    const { token } = useAuth(); // Access token from AuthContext
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/auth'); // Redirect to login if not authenticated
      }
    }, [token, router]);

    if (!token) {
      return <p>Loading...</p>; // Show loading message or spinner while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedPage;
