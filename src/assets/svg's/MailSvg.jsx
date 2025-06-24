import * as React from "react"
const MailSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.833 5c0-.917-.75-1.667-1.666-1.667H3.833c-.916 0-1.666.75-1.666 1.667m16.666 0v10c0 .917-.75 1.667-1.666 1.667H3.833c-.916 0-1.666-.75-1.666-1.667V5m16.666 0L10.5 10.834 2.167 5"
    />
  </svg>
)
export default MailSvg
