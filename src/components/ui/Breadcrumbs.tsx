import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit on the final crumb — it renders as plain text, not a link. */
  href?: string;
}

/**
 * Replaces the hand-rolled <nav aria-label="Breadcrumb"> markup that was
 * copy-pasted into every service page. Emit BreadcrumbList JSON-LD separately
 * at the page level; this component is presentation only.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="text-caption text-muted mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-x-2">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? "text-primary" : undefined} aria-current={last ? "page" : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
