import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import LabeledInputWrapper from "../LabeledInputWrapper";
import { InputTitle } from "./LabeledIntegerInputForm.style";

const LabeledIntegerInputForm = (props) => {
  return (
    <LabeledInputWrapper>
      <InputTitle>{props.title}: </InputTitle>
      <InputForm
        placeholder={props.title || ""}
        selectTextOnFocus={true}
        onChangeText={
          props.onChangeText
            ? (newValue) => props.onChangeText(Number(newValue))
            : () => {}
        }
        value={props.value ? props.value.toString() : "0"}
      />
    </LabeledInputWrapper>
  );
};

export default LabeledIntegerInputForm;
