import React from "react";
import { DatePickerAndroid } from "react-native";
import InputForm from "../InputForm/InputForm";
import LabeledInputWrapper from "../LabeledInputWrapper";

 const DatePicker = (props) => {
  props.date = props.date || "2019-11-29";
  props.style = props.style || {};
  props.changeValue = props.changeValue || function () {};
  // const fromDateToString
  const openPicker = async function () {
    let date = props.date ? new Date(props.date) : new Date();
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        props.changeValue(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn(`Cannot open date picker code ${code}`, message);
    }
  };
  const trigetOpenPicker = async () => {
    await openPicker();
  };
  return (
    <LabeledInputWrapper>
      <InputForm
        placeholder="Select a date"
        value={props.date}
        onFocus={openPicker}
        selectTextOnFocus={true}
        onSelectionChange={trigetOpenPicker}
      />
    </LabeledInputWrapper>
  );
};

export default DatePicker;
