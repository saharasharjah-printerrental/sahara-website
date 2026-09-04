import type { ReactNode } from "react";

export interface SpecRow {
  label: string;
  value: ReactNode;
  /**
   * Footnote marker text. Used on this site to mark specifications that come
   * from the manufacturer brochure rather than the public product page, so the
   * distinction stays visible and auditable.
   */
  note?: string;
}

interface Props {
  rows: SpecRow[];
  caption?: ReactNode;
}

/**
 * Two-column specification list. Renders as a real <table> so it is readable to
 * screen readers and extractable by AI crawlers, and scrolls inside its own
 * container rather than forcing the page to scroll horizontally.
 */
export default function SpecTable({ rows, caption }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/[0.06] last:border-0">
              <th
                scope="row"
                className="py-4 pr-6 align-top font-manrope text-caption font-semibold uppercase tracking-[0.12em] text-muted whitespace-nowrap"
              >
                {row.label}
              </th>
              <td className="py-4 text-[0.95rem] text-on-surface-variant">
                {row.value}
                {row.note && (
                  <sup className="ml-1 text-primary" title={row.note}>
                    †
                  </sup>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="text-caption text-muted mt-5 leading-relaxed">{caption}</p>}
    </div>
  );
}
