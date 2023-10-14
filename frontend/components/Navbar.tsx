"use client";

import { nextLocalStorage } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    nextLocalStorage()?.removeItem("auth_token");
    router.push("/login");
  };
  return (
    <div className="flex justify-end items-center py-4 px-8 bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-100">
      <div onClick={handleLogout} className="p-4 cursor-pointer">
        Logout
      </div>
    </div>
  );
}
