import React from "react";
export const HeartIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    // <svg
    //   width={size || width || 24}
    //   height={size || height || 24}
    //   viewBox="0 0 24 24"
    //   fill={filled ? fill : 'none'}
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path
    //     d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
    //     stroke={fill}
    //     strokeWidth={1.5}
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
    <svg 
      width={size || width || 24}
      height={size || height || 24}
      xmlns="http://www.w3.org/2000/svg" 
      fill={filled ? fill : 'none'} 
      viewBox="0 0 24 24" 
      {...props}
      >
        <path 
          d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" 
          stroke={fill} 
          strokeWidth={1.5} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />  
    </svg>
  );
};

