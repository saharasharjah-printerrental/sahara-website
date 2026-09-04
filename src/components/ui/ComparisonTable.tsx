import type { ReactNode } from "react";

interface Props {
  /** Column headers. The first is the row-label column. */
  columns: string[];
  /** Each row is [rowLabel, ...cellValues] — length must match `columns`. */
  rows: ReactNode[][];
  /** Zero-based index of the column to visually emphasise, if any. */
  highlightColumn?: number;
}

/**
 * Side-by-side comparison. Generalises the bespoke RTAI vs DC 3300 table so the
 * rent-vs-buy and lease-vs-rent tables elsewhere can share it.
 */
export default function ComparisonTable({ columns, rows, highlightColumn }: Props) {
  return (
    <div className="overflow-x-auto rounded-card border border-white/[0.08]">
      <table className="w-full text-left border-collapse min-w-[36rem]">
        <thead>
          <tr className="bg-surface-mid">
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={`py-4 px-5 font-sora text-[0.95rem] font-bold ${
                  i === highlightColumn ? "text-primary" : "text-white"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-white/[0.06]">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`py-4 px-5 text-[0.9rem] ${
                    c === 0
                      ? "font-semibold text-on-surface"
                      : c === highlightColumn
                        ? "text-primary"
                        : "text-on-surface-variant"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
