import * as React from "react"
const BackArrowSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.333 11H1.667m0 0L11 20.333M1.667 11 11 1.666"
    />
  </svg>
)
export default BackArrowSvg
