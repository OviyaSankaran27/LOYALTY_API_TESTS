export const testScenarios = [
  {
    id: "TC06_PARTIAL_RETURN_SINGLE",
    description: "Partial return of a single product from a multiple product bill",
    cases: [
      // Original bill with multiple products
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

            // Discounts (if any)
            billLevelOfferDiscount: 50,
            billLevelProductDiscount: 30,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 80, // 50 + 30

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 770, // 30 product discount
                productDiscount: 30,
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
                price: 600,
                mrp: 600,
                total: 600,
                netAmount: 600,
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 600, mrp: 600 }
              }
            ],

            billNetAmount: 1370, // 1400 - 30 product discount
            billTaxAmount: 0,
            billAmount: 1370,

            paymentSplits: [
              {
                mode: "CASH",
                value: 1370,
                excludeLoyaltyEarn: false
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "partialreturn@test.com",
            customerName: "Partial Return Customer"
          }
        ]
      },

      // Partial return bill (only SKU001 returned)
      {
        action: "pushReturnBill",
        data: [
          {
            invoiceType: "RET",
            originalBillId: `BILL-${Date.now()}`, // link to original bill
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(),
            transactionId: `TXN-RET-${Date.now()}`,
            billId: `BILL-RET-${Date.now()}`,

            orderStatus: "RETURNED",
            orderStatusCreationDateTime: new Date().toISOString(),

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 770,
                productDiscount: 30,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 800, mrp: 800 }
              }
            ],

            billNetAmount: 770, // net of returned product
            billTaxAmount: 0,
            billAmount: 770,

            paymentSplits: [
              {
                mode: "CASH",
                value: 770,
                excludeLoyaltyEarn: true
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "partialreturn@test.com",
            customerName: "Partial Return Customer"
          }
        ]
      }
    ]
  }
];
