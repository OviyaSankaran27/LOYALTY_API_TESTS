export const testScenarios = [
  {
    id: "TC04",
    description: "Invoice with multiple products with bill discount and product discount",
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
            billLevelOfferDiscount: 100,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 200, // 100 bill + 100 product

            // ---------------- ORDER ITEMS ----------------
            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,

                total: 800,
                netAmount: 750, // 800 - 50 product discount

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                productDiscount: 50,
                billDiscount: 0,
                loyaltyDiscount: 0,

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
                netAmount: 650, // 700 - 50 product discount

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                productDiscount: 50,
                billDiscount: 0,
                loyaltyDiscount: 0,

                posProductInfo: {
                  price: 700,
                  mrp: 700
                }
              }
            ],

            // ---------------- FINAL TOTALS ----------------
            billNetAmount: 1400, // 750 + 650
            billTaxAmount: 0,
            billAmount: 1300, // 1400 - 100 bill discount

            // ---------------- PAYMENT ----------------
            paymentSplits: [
              {
                mode: "CASH",
                value: 1300,
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
