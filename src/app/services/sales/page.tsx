export const runtime = 'edge';

import { permanentRedirect } from "next/navigation";

export default function SalesRedirect() {
  permanentRedirect("/products/");
}
