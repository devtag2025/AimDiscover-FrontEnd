"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function withAuth(PageComponent) {
  return function AuthenticatedPage(props) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      // localStorage only available in browser
      const token = localStorage.getItem("accessToken");

      if (!token) {
        const redirectUrl = encodeURIComponent(router.asPath);
        router.replace(`/login?redirect=${redirectUrl}`);
      } else {
        setIsChecking(false); // allow rendering
      }
    }, []);

    if (isChecking) return null; // prevents flicker

    return <PageComponent {...props} />;
  };
}
