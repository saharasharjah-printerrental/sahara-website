"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function TonerRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/services/toner") {
      router.replace("/services/printer-spare-parts");
    }
  }, [pathname, router]);

  return null;
}