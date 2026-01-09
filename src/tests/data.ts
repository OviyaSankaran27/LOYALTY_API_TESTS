export const testScenarios = [
  {
    id: "TC03",
    description: "Invoice with multiple products and bill-level discount",
    cases: [
      {
        action: "pushBill",
        data: [
          {
            // ---------------- BASIC BILL DETAILS ----------------
            invoiceType: "IN",
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(),

            transactionId: `TXN-${Date.now()}`,
            billId: `BILL-${Date.now()}`,

            orderStatus: "INVOICED",
            orderStatusCreationDateTime: new Date().toISOString(),

            // ---------------- BILL LEVEL DISCOUNT ----------------
            billLevelOfferDiscount: 100,   // ₹100 discount
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 100,

            // ---------------- ORDER ITEMS ----------------
            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 800,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: {
                  price: 800,
                  mrp: 800
                }
              },
              {
                skuCode: "SKU002",
                quantity: 1,
                price: 700,
                mrp: 700,
                total: 700,
                netAmount: 700,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: {
                  price: 700,
                  mrp: 700
                }
              }
            ],

            // ---------------- FINAL TOTALS ----------------
            billNetAmount: 1500,   // 800 + 700
            billTaxAmount: 0,
            billAmount: 1400,      // 1500 - 100 discount

            // ---------------- PAYMENT ----------------
            paymentSplits: [
              {
                mode: "CASH",
                value: 1400,
                excludeLoyaltyEarn: false
              }
            ],

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
