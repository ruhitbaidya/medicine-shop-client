// const Logo = () => {
//   return (
//     <div>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 50 90"
//         width="150"
//         height="100"
//       >
//         <text
//           x="50%"
//           y="50%"
//           text-anchor="middle"
//           font-family="Arial, sans-serif"
//           font-size="20"
//           fill="#4A90E2"
//           dy=".3em"
//         ></text>
//       </svg>
//     </div>
//   );
// };

// export default Logo;

import React from "react";

const Logo = () => {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 120 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo text with corrected attribute */}
      <text
        x="60"
        y="30"
        textAnchor="middle" // Fixed: changed from text-anchor to textAnchor
        dominantBaseline="middle"
        fill="#5f63f2"
        fontSize="24"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        RM-Corner💊
      </text>
    </svg>
  );
};

export default Logo;
