import * as React from "react"
const DownArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
   
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.333 1.333 13.334 13.334m0 0V1.333m0 13.334H1.333"
    />
  </svg>
)
export default DownArrow
