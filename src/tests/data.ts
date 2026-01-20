export const testScenarios = [
  {
    id: "TC04_EARN",
    description:
      "Invoice with multiple products, bill discount, product discount and loyalty earn",
    cases: [
      {
        action: "pushBill",
        data: [
          {
            invoiceType: "IN",
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(),
            transactionId: `TXN-${Date.now()}`,
            billId: `BILL-${Date.now()}`,

            orderStatus: "INVOICED",
            orderStatusCreationDateTime: new Date().toISOString(),

            // ✅ DISCOUNTS
            billLevelOfferDiscount: 100,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 200, // 100 bill + 100 product

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 750, // ONLY product discount
                productDiscount: 50,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: { price: 800, mrp: 800 }
              },
              {
                skuCode: "SKU002",
                quantity: 1,
                price: 700,
                mrp: 700,
                total: 700,
                netAmount: 650,
                productDiscount: 50,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: { price: 700, mrp: 700 }
              }
            ],

            // ✅ IMPORTANT FIX
            billNetAmount: 1300, // 1400 - 100 bill discount
            billTaxAmount: 0,
            billAmount: 1200,    // 1300 - 100 product discount

            paymentSplits: [
              {
                mode: "CASH",
                value: 1200,
                excludeLoyaltyEarn: false // ✅ EARN ENABLED
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "earn@test.com",
            customerName: "Earn Customer"
          }
        ]
      }
    ]
  }
];
