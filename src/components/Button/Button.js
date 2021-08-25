import React from "react";
import { ButtonStyled } from "./Button.style";

const Button = (props) => {
  let { onPress=null, children=null } = props;
  return (
    <ButtonStyled {...props} />
  );
};

export default Button;
