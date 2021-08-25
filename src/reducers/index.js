import {combineReducers} from 'redux';
import accountStates from './accountReducer';
import paymentsStates from './paymentsReducer';
import global from './globalReducer';

export default rootReducer = combineReducers({
  /** reducers **/
  global,
  accountStates,
  paymentsStates
});