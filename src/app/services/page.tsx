export const runtime = 'edge';

import { permanentRedirect } from "next/navigation";

export default function ServicesPage() {
  permanentRedirect("/services/printer-rental/");
}
