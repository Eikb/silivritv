import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token is found, redirect the user to the login page
        router.push("/admin/login");
      }
    }, [router]);

    // If the user is authenticated, render the actual component
    return <Component {...props} />;
  };
}

export default requireAuth;
