import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import LabeledInputWrapper from "../LabeledInputWrapper";
import { InputTitle } from "./LabeledFloatInputForm.style";

const LabeledFloatInputForm = (props) => {
  return (
    <LabeledInputWrapper>
      <InputTitle>{props.title}: </InputTitle>
      <InputForm
        selectTextOnFocus={true}
        placeholder={props.placeholder || null}
        onChangeText={
          props.onChangeText
            ? (newValue) => props.onChangeText(parseFloat(newValue))
            : () => {}
        }
        value={props.value ? props.value.toString() : "0.00"}
      />
    </LabeledInputWrapper>
  );
};

export default LabeledFloatInputForm;
