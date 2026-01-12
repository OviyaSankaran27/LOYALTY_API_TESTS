export const testScenarios = [
  {
    id: "TC04",
    description:
      "Invoice with multiple products, bill discount, product discount and loyalty discount",
    cases: [
      {
        action: "pushBill",
        data: [
          {
            // ---------------- BASIC DETAILS ----------------
            invoiceType: "IN",
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(),
            transactionId: `TXN-${Date.now()}`,
            billId: `BILL-${Date.now()}`,

            orderStatus: "INVOICED",
            orderStatusCreationDateTime: new Date().toISOString(),

            // ---------------- DISCOUNTS ----------------
            billLevelOfferDiscount: 100,     // bill discount
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 100,   // loyalty discount
            totalDiscountAmount: 300,        // 100 bill + 100 loyalty + 100 product

            // ---------------- PRODUCTS ----------------
            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 750,

                productDiscount: 50,
                billDiscount: 0,
                loyaltyDiscount: 0,

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
                netAmount: 650,

                productDiscount: 50,
                billDiscount: 0,
                loyaltyDiscount: 0,

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

            // ---------------- TOTALS ----------------
            billNetAmount: 1400,
            billTaxAmount: 0,
            billAmount: 1100,

            // ---------------- PAYMENT ----------------
            paymentSplits: [
              {
                mode: "CASH",
                value: 1100,
                excludeLoyaltyEarn: true   // redemption bill
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
