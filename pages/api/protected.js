import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Protected() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return <h1>Protected content: You are logged in!</h1>;
}
