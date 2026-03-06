/*************************************************
 * Test Case Interface
 *************************************************/
export interface TestCase {
  id: string;
  description: string;
  testData: string;
  expected: string;

  mobile: string;
  postPayload: any[];
  getParams: any;
}

/*************************************************
 * Common Date
 *************************************************/
const DATE = "2026-02-25T10:30:00Z";

/*************************************************
 * Base Bill
 *************************************************/
const baseBill = {
  invoiceType: "IN",
  billType: "Retail",
  channel: "POS",
  billDate: DATE,

  storeCode: "STORE_01",

  billLevelOfferDiscount: 0,
  billLevelProductDiscount: 0,
  billLevelFooterDiscount: 0,
  billLevelLoyaltyDiscount: 0,
  totalDiscountAmount: 0,

  customerName: "",
  customerEmail: "",
  customerMobile: "",

  orderItems: [],
  paymentSplits: [],

  offerCodes: [],

  billAmount: 0,
  billNetAmount: 0
};

/*************************************************
 * Products
 *************************************************/
const PROD_A = {
  skuCode: "PROD_A",
  quantity: 1,
  price: 1000,
  total: 1000,
  netAmount: 1000,
  salesPerson: "SP01"
};

const PROD_B = {
  skuCode: "PROD_B",
  quantity: 4,
  price: 2500,
  total: 10000,
  netAmount: 10000,
  salesPerson: "SP02"
};

const PROD_C = {
  skuCode: "PROD_C",
  quantity: 5,
  price: 5000,
  total: 25000,
  netAmount: 25000,
  salesPerson: "SP03"
};

/*************************************************
 * Bills
 *************************************************/

const BILL_1 = {
  ...baseBill,
  transactionId: "TXN_01",
  billId: "BILL_01",

  customerName: "Customer A",
  customerEmail: "a@test.com",
  customerMobile: "9000000001",

  orderItems: [PROD_A],

  paymentSplits: [{ mode: "VCH", value: 1000 }],

  billAmount: 1000,
  billNetAmount: 1000
};

const BILL_2 = {
  ...baseBill,
  transactionId: "TXN_02",
  billId: "BILL_02",

  customerName: "Customer B",
  customerEmail: "b@test.com",
  customerMobile: "9000000002",

  orderItems: [PROD_B, PROD_C],

  paymentSplits: [{ mode: "VCH", value: 35000 }],

  billAmount: 35000,
  billNetAmount: 35000
};

const BILL_LOYALTY = {
  ...BILL_2,

  transactionId: "TXN_03",
  billId: "BILL_03",

  billLevelLoyaltyDiscount: 500,
  totalDiscountAmount: 500,

  paymentSplits: [
    { mode: "VCH", value: 34500 },
    { mode: "loyalty", value: 500 }
  ],

  billAmount: 34500,
  billNetAmount: 34500
};

const SR_PARTIAL = {
  invoiceType: "SR",
  billType: "Retail",
  channel: "POS",

  billId: "SR_01",
  originalBillId: "BILL_03",

  customerName: "Customer B",
  customerMobile: "9000000002",

  orderItems: [
    {
      skuCode: "PROD_B",
      quantity: -1,
      price: 2500,
      total: -2500,
      netAmount: -2500,
      salesPerson: "SP02"
    }
  ],

  billAmount: -2500,
  billNetAmount: -2500
};

const BILL_DISCOUNT = {
  ...BILL_2,

  transactionId: "TXN_04",
  billId: "BILL_04",

  customerMobile: "9000000003",

  billLevelProductDiscount: 100,
  totalDiscountAmount: 100,

  offerCodes: ["OFFER100"],

  billAmount: 34900,
  billNetAmount: 34900
};

const ECOMM_BILL = {
  ...BILL_2,

  transactionId: "TXN_05",
  billId: "BILL_05",

  channel: "ECOMM",

  customerMobile: "9000000004"
};

/*************************************************
 * 16 TEST CASES
 *************************************************/

export const testCases: TestCase[] = [

{
id:"TC01",
description:"Generate a single bill for customer with single product",
testData:"billAmount 1000 Qty 1",
expected:"Bill posted successfully and loyalty earned",
mobile:"9000000001",
postPayload:[BILL_1],
getParams:{mobile:"9000000001"}
},

{
id:"TC02",
description:"Generate bill with multiple products",
testData:"2500x4 , 5000x5",
expected:"Bill generated successfully",
mobile:"9000000002",
postPayload:[BILL_2],
getParams:{mobile:"9000000002"}
},

{
id:"TC03",
description:"Generate bill with loyalty burn",
testData:"Loyalty burn 500",
expected:"Points deducted correctly",
mobile:"9000000002",
postPayload:[BILL_LOYALTY],
getParams:{mobile:"9000000002"}
},

{
id:"TC04",
description:"Partial sales return",
testData:"Return 1 product",
expected:"Negative SR bill generated",
mobile:"9000000002",
postPayload:[SR_PARTIAL],
getParams:{mobile:"9000000002"}
},

{
id:"TC05",
description:"Bill with discount and offer",
testData:"Discount 100 + OFFER100",
expected:"Bill generated with discount",
mobile:"9000000003",
postPayload:[BILL_DISCOUNT],
getParams:{mobile:"9000000003"}
},

{
id:"TC06",
description:"Bill with product and bill offer and loyalty then cancel",
testData:"PROD10 + BILL10 + loyalty",
expected:"Bill cancelled successfully",
mobile:"9000000005",
postPayload:[BILL_2],
getParams:{mobile:"9000000005"}
},

{
id:"TC07",
description:"Bill with product and bill offer and complete return",
testData:"PROD10 + BILL10",
expected:"Complete return success",
mobile:"9000000006",
postPayload:[BILL_2],
getParams:{mobile:"9000000006"}
},

{
id:"TC08",
description:"ECOMM bill generation",
testData:"Online order multiple products",
expected:"ECOMM bill generated",
mobile:"9000000004",
postPayload:[ECOMM_BILL],
getParams:{mobile:"9000000004"}
},

{
id:"TC09",
description:"Bill generation with offer code",
testData:"offer code applied",
expected:"Bill success",
mobile:"9000000007",
postPayload:[BILL_1],
getParams:{mobile:"9000000007"}
},

{
id:"TC10",
description:"IN2 bill cancellation",
testData:"cancel bill",
expected:"Bill cancelled",
mobile:"9000000007",
postPayload:[BILL_1],
getParams:{mobile:"9000000007"}
},

{
id:"TC11",
description:"Bill with loyalty discount and bill discount",
testData:"bill discount 300 loyalty 200",
expected:"Discount applied correctly",
mobile:"9000000008",
postPayload:[BILL_2],
getParams:{mobile:"9000000008"}
},

{
id:"TC12",
description:"Partial return for discount bill",
testData:"partial return",
expected:"SR generated",
mobile:"9000000008",
postPayload:[SR_PARTIAL],
getParams:{mobile:"9000000008"}
},

{
id:"TC13",
description:"Bill with offer code cancel",
testData:"offer code cancel",
expected:"Discount reversed",
mobile:"9000000009",
postPayload:[BILL_1],
getParams:{mobile:"9000000009"}
},

{
id:"TC14",
description:"Complete return with offer",
testData:"complete SR",
expected:"Points reversed",
mobile:"9000000010",
postPayload:[SR_PARTIAL],
getParams:{mobile:"9000000010"}
},

{
id:"TC15",
description:"Bill cancel with product and bill discount",
testData:"multiple discounts cancel",
expected:"Discount reversed",
mobile:"9000000011",
postPayload:[BILL_DISCOUNT],
getParams:{mobile:"9000000011"}
},

{
id:"TC16",
description:"Complete return with loyalty and discounts",
testData:"complete return",
expected:"Loyalty reversed",
mobile:"9000000012",
postPayload:[SR_PARTIAL],
getParams:{mobile:"9000000012"}
}

];