import React from 'react';

const Button = ({ children, className, ...props }) => {
  const primaryStyle = `bg-primary text-white bg-opacity-90 hover:bg-opacity-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline`;
  const secondaryStyle = `bg-transparent text-gray-600 hover:text-gray-700 border border-gray-500 hover:border-gray-800  hover:bg-white py-2 px-4 rounded focus:outline-none focus:shadow-outline`;
  return (
    <button
      className={`flex justify-center items-center  
       ${props.secondary ? secondaryStyle : primaryStyle}  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
