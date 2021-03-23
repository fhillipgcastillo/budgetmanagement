import { UPDATE_PAYMENTS } from "../constants";

const INITIAL_STATE = {
  payments: [],
};

export default paymentsReducer = (prevState = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case UPDATE_PAYMENTS:
      console.log(
        `Payments - ${action.type} with payload ${JSON.stringify(
          action.payload
        )}`
      );
      return {
        ...prevState,
        payments: action.payload,
      };
    default:
      return prevState;
  }
};
