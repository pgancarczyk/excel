import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...otherProps } = props;
  return (
    <button
      className={`${
        props.disabled
          ? "bg-gray-500"
          : "bg-blue-500 cursor-pointer hover:bg-blue-400"
      } p-2 inline-block rounded text-gray-100 w-48 text-center transition-all ${className}`}
      {...otherProps}
    >
      {props.children}
    </button>
  );
};
