import React from "react";

function ButtonComponent({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

export default ButtonComponent;
