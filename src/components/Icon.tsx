import type { ReactNode } from "react";

export type IconName =
  | "database"
  | "query"
  | "saved"
  | "experiment"
  | "table"
  | "settings"
  | "menu"
  | "close"
  | "play"
  | "clock"
  | "rows"
  | "cost"
  | "schema"
  | "relationship"
  | "execution"
  | "flow"
  | "raw"
  | "results"
  | "chevronDown"
  | "chevronRight"
  | "expand"
  | "collapse"
  | "pending"
  | "scan"
  | "join"
  | "aggregate"
  | "sort"
  | "limit"
  | "other";

const paths: Record<IconName, ReactNode> = {
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  query: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  saved: <><path d="M5 4h14v16H5z" /><path d="M8 4v5h8V4M8 20v-7h8v7" /></>,
  experiment: <><path d="M9 3h6M10 3v6l-5.1 8.2A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.1-3.8L14 9V3" /><path d="M8 15h8" /></>,
  table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  rows: <><path d="M4 5h16M4 12h16M4 19h16" /><circle cx="7" cy="5" r="1" fill="currentColor" /><circle cx="7" cy="12" r="1" fill="currentColor" /><circle cx="7" cy="19" r="1" fill="currentColor" /></>,
  cost: <><path d="M12 3v18M17 7.5c0-1.4-1.8-2.5-4-2.5S9 6.1 9 7.5 10.8 10 13 10s4 1.1 4 2.5-1.8 2.5-4 2.5-4-1.1-4-2.5" /></>,
  schema: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6.5h4a2 2 0 0 1 2 2v5.5" /></>,
  relationship: <><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="m8.6 10.7 6.8-3.4m-6.8 6 6.8 3.4" /></>,
  execution: <><path d="m4 5 6 6 5-5 5 5" /><path d="M4 19h16" /></>,
  flow: <><rect x="3" y="4" width="7" height="5" rx="1" /><rect x="14" y="15" width="7" height="5" rx="1" /><path d="M10 6.5h2a2 2 0 0 1 2 2V15" /></>,
  raw: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></>,
  results: <><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  expand: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /><path d="M8 12h8m-4-4v8" /></>,
  collapse: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /><path d="M8 12h8" /></>,
  pending: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  scan: <><path d="M4 7V5a1 1 0 0 1 1-1h2m10 0h2a1 1 0 0 1 1 1v2M4 17v2a1 1 0 0 0 1 1h2m10 0h2a1 1 0 0 0 1-1v-2M8 12h8" /></>,
  join: <><circle cx="8" cy="8" r="4" /><circle cx="16" cy="16" r="4" /><path d="m11 11 2 2" /></>,
  aggregate: <><path d="M3 20 9 8l4 8 3-6 5 10" /><path d="M3 4h18" /></>,
  sort: <><path d="M8 5v14m0 0-4-4m4 4 4-4m4-6h4m-4 4h3m-3-8h5" /></>,
  limit: <><path d="M4 5h16M4 19h16M8 5v14m8-14v14" /></>,
  other: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 18, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

