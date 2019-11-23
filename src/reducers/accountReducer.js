import { combineReducers } from 'redux';

const INITIAL_STATE = {
  accounts: []
};

const AcountReducer = (state = INITIAL_STATE, action)=>{
  switch (action.type){
    default:
      return state
  }
};

export default combineReducers({
  account: AcountReducer,
})