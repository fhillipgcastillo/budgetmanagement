const TYPEOFPAYMENTS = 
  {
    Monthly: 1,
    Unique: 2,
    Quaterly: 3,
    Custom : 0, /* OPTIONAL or Nice to have */
  },
  SPENTS_CATEGORIES = {
    FixRent: 1,
    TransportSpences: 2,
    Utilities: 3,
    Food: 4,
    Dept: 5,
    Entertainment: 6,
    Pregnancy: 7
  };

  const ACOUNT_MODEL = [
    {
      id: 1,
      title:"Internet Claro Fibra",/* account title */
      description: "",
      amount: 1460,
      uniquePayement: false,
      dayOfMothToPay: 0,
      maxDayOfMothToPay: 0,
      customDateToPay: "",
      maxDateToPay: "11/16/2019",
      category: SPENTS_CATEGORIES.FixRent,
      type: TYPEOFPAYMENTS.MonthlyPayment,
      amountLimit: 0
    },
    {
      id: 2,
      title:"Sonography",/* account title */
      description: "",
      amount: 2600,
      uniquePayement: true,
      dayOfMothToPay: 15,
      maxDayOfMothToPay: 28,
      customDateToPay: "11/13/2019",
      maxDateToPay: "11/16/2019",
      category: SPENTS_CATEGORIES.FixRent,
      type: TYPEOFPAYMENTS.UniquePayment, /* paymentType */
      amountLimit: 0
    }
  ];

export default { 
  ...ACOUNT_MODEL,
  ...SPENTS_CATEGORIES,
  ...TYPEOFPAYMENTS
};


/* 
  When TYPEOFPAYMENTS is UniquePayment
    requires maxDayToPay
    dayOfMothToPay and maxDayOfMothToPay are optionals
      or could be auto setup by maxDayToPay
  When TYPEOFPAYMENTS is Montly

*/