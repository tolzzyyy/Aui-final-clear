import * as React from "react"
const CircleCheckSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M29.333 14.774V16a13.333 13.333 0 1 1-7.906-12.187m7.906 1.52L16 18.68l-4-4"
    />
  </svg>
)
export default CircleCheckSvg
