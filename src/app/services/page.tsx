"use client";

export const runtime = 'edge';

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ServicesPage() {
  useEffect(() => {
    // Redirect to printer-rental as default service
    redirect("/services/printer-rental");
  }, []);

  return null;
}