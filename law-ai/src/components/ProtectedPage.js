import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const ProtectedPage = (WrappedComponent) => {
  return (props) => {
    const token = Cookies.get('access_token');
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        router.push('/auth'); // Redirect to login if not authenticated
      } else {
        setLoading(false); // Set loading to false once authentication is confirmed
      }
    }, [token, router]);

    if (loading) {
      return <p>Loading...</p>; // Show loading message or spinner while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedPage;
