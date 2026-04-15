import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const IconBase: React.FC<IconProps> = ({ children, className, viewBox = '0 0 24 24', ...props }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </IconBase>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconBase>
);

export const AlertCircleIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </IconBase>
);

export const RefreshCwIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.5 6.36L3 16" />
    <path d="M8 16H3v5" />
  </IconBase>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </IconBase>
);

export const MessageSquarePlusIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7" />
    <path d="M19 2v6" />
    <path d="M16 5h6" />
  </IconBase>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </IconBase>
);

export const MailIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </IconBase>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </IconBase>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M20 6 9 17l-5-5" />
  </IconBase>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="m6 9 6 6 6-6" />
  </IconBase>
);

export const ShieldAlertIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </IconBase>
);

export const FingerprintIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 11a4 4 0 0 1 4 4v1" />
    <path d="M8 15a4 4 0 0 1 8 0v3" />
    <path d="M5 15a7 7 0 0 1 14 0v3" />
    <path d="M12 4a8 8 0 0 0-8 8" />
    <path d="M12 4a8 8 0 0 1 8 8" />
    <path d="M6 20v-1" />
    <path d="M10 20v-2" />
    <path d="M14 20v-2" />
    <path d="M18 20v-1" />
  </IconBase>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </IconBase>
);
