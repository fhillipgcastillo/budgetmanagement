import { CHANGE_REFRESHING } from "../constants";

const INITIAL_STATE = {
  refreshing: false
};

export default GlobalReducer = (prevState = INITIAL_STATE, action) => {

  switch (action.type) {
    case CHANGE_REFRESHING:
      return {
        ...prevState,
        refreshing: action.payload
      }
    default:
      return prevState;
  }
}
