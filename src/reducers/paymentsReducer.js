import { UPDATE_PAYMENTS, START_ACCOUNT_PAYMENT } from "../constants";

const INITIAL_STATE = {
  payments: [],
};

export default paymentsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAYMENTS:
      console.log(`Payments - ${action.type} with payload`);
      return {
        ...prevState,
        payments: action.payload,
      };
    
    default:
      return prevState;
  }
};
