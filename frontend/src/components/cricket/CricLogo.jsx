import React from "react";

// Inline SVG version of the CricManager mark.
// - No white background — the orange gradient fills the full circle.
// - Enlarged stumps + ball so the mark reads well inside the header badge.
// - Subtle faceted overlay evokes the original polygonal artwork.
export default function CricLogo({ className = "", title = "CricManager" }) {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="crm-ball" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#ffaa4c" />
          <stop offset="55%" stopColor="#ff7b2c" />
          <stop offset="100%" stopColor="#d9461f" />
        </radialGradient>
        <linearGradient id="crm-stump" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1ede4" />
        </linearGradient>
        <pattern
          id="crm-facets"
          x="0"
          y="0"
          width="14"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(10)"
        >
          <polygon
            points="7,0 14,6 7,12 0,6"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Orange disc — fills entire badge */}
      <circle cx="64" cy="64" r="60" fill="url(#crm-ball)" />
      <circle cx="64" cy="64" r="60" fill="url(#crm-facets)" />

      {/* Top highlight */}
      <path
        d="M28 38 Q50 22 78 26"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Three stumps — enlarged, splaying outward like the reference */}
      <g>
        {/* left stump */}
        <path
          d="M48 114 Q42 78 34 36"
          stroke="url(#crm-stump)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* center stump */}
        <path
          d="M64 116 Q64 74 64 30"
          stroke="url(#crm-stump)"
          strokeWidth="8.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* right stump */}
        <path
          d="M80 114 Q86 78 94 36"
          stroke="url(#crm-stump)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Cricket ball at the base */}
      <g>
        <circle cx="64" cy="104" r="11" fill="#ffffff" />
        <path
          d="M54 104 Q64 98 74 104"
          stroke="#d9461f"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M54 104 Q64 110 74 104"
          stroke="#d9461f"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
