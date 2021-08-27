import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import LabeledInputWrapper from "../LabeledInputWrapper";
import { InputTitle } from "./LabeledInputForm.style";

const LabeledInputForm = (props) => {
  const [editing, setEditing] = useState(false);
  const handleOnFocus = (e) => setEditing(true);
  const handleOnBlur = (e) => setEditing(false);
  return (
    <LabeledInputWrapper>
      { !props.dynamicTitle || (props.dynamicTitle && !editing) ? (<InputTitle>{props.title}</InputTitle>) : null}
      <InputForm
        placeholder={props.placeholder || null}
        onChangeText={props.onChangeText || null}
        value={props.value || ""}
        onFocus={handleOnFocus.bind(this)}
        onBlur={handleOnBlur.bind(this)}
      />
    </LabeledInputWrapper>
  );
};

export default LabeledInputForm;
