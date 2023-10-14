"use client";
import { nextLocalStorage } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const token = nextLocalStorage()?.getItem("auth_token");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/tasks");
    }
  }, [token]);
  return null;
}
