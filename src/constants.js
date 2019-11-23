export const AN_ACTION = "AN_ACTION";



/*
* action creators
*/

export function DO_ACTION(stateValue){
  return {
    trype: AN_ACTION,
    stateValue
  }
}