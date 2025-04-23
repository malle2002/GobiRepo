import { useEffect } from "react";
import { useRouter } from "next/router";

export default function FixFacebookRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#_=_") {
      router.replace(window.location.pathname);
    }
  }, []);

  return null;
}
