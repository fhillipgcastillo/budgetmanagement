// ACTIONS NAMES
export const AN_ACTION = "AN_ACTION";
export const CREATE_NEW_ACCOUNT = "CREATE_NEW_ACCOUNT";
export const GET_ALL_ACCOUNTS = "GET_ALL_ACCOUNTS";
export const UPDATE_ACCOUNTS = "UPDATE_ACCOUNTS";
export const CHANGE_CURRENT_VIEW = "CHANGE_CURRENT_VIEW";
export const CHANGE_CURRENT_ACCOUNT_DETAIL = "CHANGE_CURRENT_ACCOUNT_DETAIL";

// SINGLE VALUE
export const DBKEY = "budget_acount";

//Objects/Enums
export const PAGES = {
  dashboard: 0,
  newItem: 1,
  detail: 2
};
export const SPENTS_CATEGORIES = {
  FixRent: 1,
  TransportSpences: 2,
  Utilities: 3,
  Food: 4,
  Dept: 5,
  Entertainment: 6,
  Pregnancy: 7
};
export const TYPEOFPAYMENTS = {
  Monthly: 1,
  Unique: 2,
  Quaterly: 3,
  Custom : 0, /* OPTIONAL or Nice to have */
};

// Arrays
export const ACOUNT_MODEL = [
  {
    id: "1",
    title:"Internet Claro Fibra",/* account title */
    description: "",
    amount: 1460,
    uniquePayement: false,
    dayOfMothToPay: 0,
    maxDayOfMothToPay: 0,
    customDateToPay: "",
    maxDateToPay: "11/16/2019",
    category: 1,
    type: 1,
    amountLimit: 0
  },
  {
    id: "2",
    title:"Sonography",/* account title */
    description: "",
    amount: 2600,
    uniquePayement: true,
    dayOfMothToPay: 15,
    maxDayOfMothToPay: 28,
    customDateToPay: "11/13/2019",
    maxDateToPay: "11/16/2019",
    category: 1,
    type: 4, /* paymentType */
    amountLimit: 0
  }
];