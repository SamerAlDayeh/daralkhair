import React from "react";
import "./IslamicPattern.css";

export const IslamicPattern = ({ opacity = 0.05, className = "" }) => {
  return (
    <div className={`islamic-pattern-bg ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="islamic-star-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30,0 L 37,12 L 50,7 L 45,20 L 58,28 L 46,34 L 52,48 L 38,44 L 30,58 L 22,44 L 8,48 L 14,34 L 2,28 L 15,20 L 10,7 L 23,12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle
              cx="30"
              cy="30"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <path
              d="M 0,0 L 60,60 M 60,0 L 0,60"
              stroke="currentColor"
              strokeWidth="0.3"
              strokeDasharray="2,2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
};
