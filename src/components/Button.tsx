import React from "react";

type Props = {};

function Button({
  ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-3 py-2 border rounded text-white bg-slate-600 hover:bg-slate-800 ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
}

export default Button;
