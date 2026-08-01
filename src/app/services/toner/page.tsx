export const runtime = 'edge';

import { permanentRedirect } from "next/navigation";

export default function TonerRedirect() {
  permanentRedirect("/services/printer-spare-parts/");
}
