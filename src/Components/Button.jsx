import React, { Children, Component } from "react";

// function ButtonComponent({ children, ...props }) {
//   return <button {...props}>{children}</button>;
// }

class ButtonComponent extends Component {
  render() {
    return <button {...this.props}>{this.props.children}</button>;
  }
}

export default ButtonComponent;
