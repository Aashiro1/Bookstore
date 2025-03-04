"use client";

import { useEffect } from "react";

export default function Unauthorized() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 2000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>You are not authorized as admin.</h1>
      <p>Redirecting you to the homepage...</p>
    </div>
  );
}
