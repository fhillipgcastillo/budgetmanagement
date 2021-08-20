import { UPDATE_PAYMENTS, CREATE_PAYMENT, PAYMENT_DONE } from "../constants";

const INITIAL_STATE = {
  payments: [],
};

export default paymentsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAYMENTS:
      return {
        ...prevState,
        payments: action.payload,
      };
    case CREATE_PAYMENT:
      return {
        ...prevState,
        payments: [...prevState.payments, action.payload],
      };
    case PAYMENT_DONE:
      console.log("Payment done successfully");
    default:
      return prevState;
  }
};
