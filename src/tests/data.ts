export const testScenarios = [
  {
    id: "TC02",
    description: "Invoice bill of ₹1000 with current date and time",
    cases: [
      {
        action: "pushBill",
        data: [
          {
            // ---------------- BASIC BILL DETAILS ----------------
            invoiceType: "IN",
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(), // ✅ CURRENT DATE & TIME

            transactionId: `TXN-${Date.now()}`,
            billId: `BILL-${Date.now()}`,

            orderStatus: "INVOICED",
            orderStatusCreationDateTime: new Date().toISOString(),

            // ---------------- NO DISCOUNTS ----------------
            billLevelOfferDiscount: 0,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 0,

            // ---------------- ORDER ITEMS ----------------
            orderItems: [
              {
                skuCode: "SKU1000",
                quantity: 1,
                price: 1000,
                mrp: 1000,

                total: 1000,
                netAmount: 1000,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: {
                  price: 1000,
                  mrp: 1000
                }
              }
            ],

            // ---------------- PAYMENT ----------------
            paymentSplits: [
              {
                mode: "CASH",
                value: 1000,
                excludeLoyaltyEarn: false
              }
            ],

            // ---------------- FINAL TOTALS ----------------
            billAmount: 1000,
            billNetAmount: 1000,
            billTaxAmount: 0,

            // ---------------- STORE & CUSTOMER ----------------
            storeCode: "IMP",

            customerMobile: "9876543210",
            customerEmail: "test@gmail.com",
            customerName: "Test Customer"
          }
        ]
      }
    ]
  }
];
