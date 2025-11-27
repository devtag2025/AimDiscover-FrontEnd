
import { useEffect } from "react";

export function withAuth(PageComponent) {
  const AuthenticatedComponent = (props) => {
    
    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        const current = window.location.pathname;
        window.location.href = `/login?redirect=${current}`;
      }
    }, []);

    return <PageComponent {...props} />;
  };

  return AuthenticatedComponent;
}
