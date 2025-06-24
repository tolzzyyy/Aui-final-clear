import React from "react";

const ArrowSvg = (props) => {
  return (
    <svg
      {...props}
      role="img"
      aria-hidden="true"
      width="104"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="layer">
        <path
          d="M4.93 5C2.75 5 1 6.33 1 8s1.75 3 3.93 3c2.19 0 3.94-1.33 3.94-3S7.12 5 4.93 5z"
          fill="#fff"
        />
        <path
          d="M103.71 8.71c.39-.39.39-1.03 0-1.42L97.34.93a.996.996 0 1 0-1.41 1.41L101.59 8l-5.66 5.66a.996.996 0 1 0 1.41 1.41l6.37-6.36zM1 8h1c0-.88 1.03-2 2.93-2V4C2.46 4 0 5.55 0 8h1zm3.93-3v1c1.9 0 2.94 1.12 2.94 2h2c0-2.45-2.47-4-4.94-4v1zm3.94 3h-1c0 .88-1.04 2-2.94 2v2c2.47 0 4.94-1.55 4.94-4h-1zm-3.94 3v-1C3.03 10 2 8.88 2 8H0c0 2.45 2.46 4 4.93 4v-1zm3.94-3v1H103V7H8.87v1z"
          fill="#E1B52F"
        />
      </g>
    </svg>
  );
};
export default ArrowSvg;
