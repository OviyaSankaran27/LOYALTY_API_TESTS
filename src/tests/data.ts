/*************************************************
 * Test Case Interface
 *************************************************/
export interface TestCase {
  id: string;
  mobile: string;
  postPayload: any[];
  getParams: any;
}

/*************************************************
 * Fixed Common Values
 *************************************************/
const FIXED_DATE = "2026-02-25T10:30:00Z";

/*************************************************
 * Base Bill Payload
 *************************************************/
const baseBillPayload = {
  invoiceType: "IN",
  billType: "Retail",
  channel: "POS",
  billDate: FIXED_DATE,

  billLevelOfferDiscount: 0,
  billLevelProductDiscount: 0,
  billLevelFooterDiscount: 0,
  billLevelLoyaltyDiscount: 0,
  totalDiscountAmount: 0,

  orderStatus: "INVOICED",
  orderStatusCreationDateTime: FIXED_DATE,

  storeCode: "STORE_01",

  customerName: "",
  customerEmail: "",
  customerMobile: "",

  orderItems: [],
  paymentSplits: [],

  offerCodes: [],
  billAmount: 0,
  billNetAmount: 0,

  campaignInfo: { campaignId: "CMP_1001" }
};

/*************************************************
 * Product Templates
 *************************************************/
const IPHONE_ITEM = {
  skuCode: "IPHONE_15",
  quantity: 1,
  price: 75000,
  total: 75000,
  netAmount: 75000,
  salesPerson: "SP_01"
};

const SAMSUNG_ITEM = {
  skuCode: "SAMSUNG_S23",
  quantity: 1,
  price: 65000,
  total: 65000,
  netAmount: 65000,
  salesPerson: "SP_02"
};

/*************************************************
 * 1️⃣ Single Product Bill
 *************************************************/
const singleProductBill = {
  ...baseBillPayload,
  transactionId: "TXN_001",
  billId: "BILL_001",

  customerName: "Arun Kumar",
  customerEmail: "arun.kumar@test.com",
  customerMobile: "8838530066",

  orderItems: [IPHONE_ITEM],

  paymentSplits: [{ mode: "VCH", value: 75000 }],
  billAmount: 75000,
  billNetAmount: 75000
};

/*************************************************
 * 2️⃣ Multiple Product Bill
 *************************************************/
const multiProductBill = {
  ...baseBillPayload,
  transactionId: "TXN_002",
  billId: "BILL_002",

  customerName: "Priya Sharma",
  customerEmail: "priya.sharma@test.com",
  customerMobile: "9047231269",

  orderItems: [IPHONE_ITEM, SAMSUNG_ITEM],

  paymentSplits: [{ mode: "VCH", value: 140000 }],
  billAmount: 140000,
  billNetAmount: 140000
};

/*************************************************
 * 3️⃣ Loyalty Burn Bill
 *************************************************/
const loyaltyBurnBill = {
  ...multiProductBill,

  transactionId: "TXN_003",
  billId: "BILL_003",

  billLevelLoyaltyDiscount: 500,
  totalDiscountAmount: 500,

  paymentSplits: [
    { mode: "VCH", value: 139500 },
    { mode: "loyalty", value: 500, excludeLoyaltyEarn: true }
  ],

  billAmount: 139500,
  billNetAmount: 139500
};

/*************************************************
 * 4️⃣ SR – Partial Return
 *************************************************/
const partialReturnSRBill = {
  invoiceType: "SR",
  billType: "Retail",
  channel: "POS",

  billId: "SR_001",
  billDate: "2026-02-26T10:30:00Z",

  originalBillId: "BILL_003",
  originalBillDate: FIXED_DATE,

  customerName: "Priya Sharma",
  customerEmail: "priya.sharma@test.com",
  customerMobile: "9047231269",

  orderItems: [
    {
      skuCode: "SAMSUNG_S23",
      quantity: -1,
      price: 65000,        // positive
      total: -65000,
      netAmount: -65000,
      salesPerson: "SP_02"
    }
  ],

  billAmount: -65000,
  billNetAmount: -65000
};

/*************************************************
 * 5️⃣ Bill Discount + Offer
 *************************************************/
const billDiscountBill = {
  ...multiProductBill,

  transactionId: "TXN_004",
  billId: "BILL_004",

  customerMobile: "8610145012",

  billLevelProductDiscount: 100,
  totalDiscountAmount: 100,
  offerCodes: ["OFFER_100"],

  billAmount: 139900,
  billNetAmount: 139900
};

/*************************************************
 * ✅ FINAL TEST CASES
 *************************************************/
export const testCases: TestCase[] = [
  {
    id: "TC_01_SINGLE_PRODUCT",
    mobile: "8838530066",
    postPayload: [singleProductBill],
    getParams: { mobile: "8838530066" }
  },
  {
    id: "TC_02_MULTI_PRODUCT",
    mobile: "9047231269",
    postPayload: [multiProductBill],
    getParams: { mobile: "9047231269" }
  },
  {
    id: "TC_03_LOYALTY_BURN",
    mobile: "9047231269",
    postPayload: [loyaltyBurnBill],
    getParams: { mobile: "9047231269" }
  },
  {
    id: "TC_04_SR_PARTIAL_RETURN",
    mobile: "9047231269",
    postPayload: [partialReturnSRBill],
    getParams: { mobile: "9047231269" }
  },
  {
    id: "TC_05_BILL_DISCOUNT",
    mobile: "8610145012",
    postPayload: [billDiscountBill],
    getParams: { mobile: "8610145012" }
  }
];