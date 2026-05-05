"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
    // Redirect to Printer-rental as default service
    redirect("/services/Printer-rental");
  }, []);

  return null;
}
