import React from "react";
import { ButtonStyled } from "./Button.style";
import { View, Text, StyleSheet } from "react-native";

const Button = (props) => {
  return (
    <ButtonStyled {...props} />
  );
};

export default Button;
