export const testScenarios = [
  {
    id: "TC08_EXCHANGE_TWO_PRODUCTS_SAME_PRICE",
    description: "Exchange 2 products from a multiple product bill with new products of same price",
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
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 50, // only bill-level discount

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 500,
                mrp: 500,
                total: 500,
                netAmount: 475, // after proportional discount
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 500, mrp: 500 }
              },
              {
                skuCode: "SKU002",
                quantity: 1,
                price: 700,
                mrp: 700,
                total: 700,
                netAmount: 665, // after proportional discount
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 700, mrp: 700 }
              },
              {
                skuCode: "SKU003",
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

            billNetAmount: 1740, // sum of netAmounts
            billTaxAmount: 0,
            billAmount: 1740,

            paymentSplits: [
              {
                mode: "CASH",
                value: 1740,
                excludeLoyaltyEarn: false
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "exchange@test.com",
            customerName: "Exchange Customer"
          }
        ]
      },

      // Exchange bill for 2 products
      {
        action: "pushReturnBill",
        data: [
          {
            invoiceType: "EXC",
            originalBillId: `BILL-${Date.now()}`, // link to original bill
            billType: "Retail",
            channel: "POS",

            billDate: new Date().toISOString(),
            transactionId: `TXN-EXC-${Date.now()}`,
            billId: `BILL-EXC-${Date.now()}`,

            orderStatus: "EXCHANGED",
            orderStatusCreationDateTime: new Date().toISOString(),

            // Returning SKU001 and SKU002
            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 500,
                mrp: 500,
                total: 500,
                netAmount: 475,
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 500, mrp: 500 },
                exchangedWith: {
                  skuCode: "SKU101",
                  quantity: 1,
                  price: 500,
                  mrp: 500
                }
              },
              {
                skuCode: "SKU002",
                quantity: 1,
                price: 700,
                mrp: 700,
                total: 700,
                netAmount: 665,
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 700, mrp: 700 },
                exchangedWith: {
                  skuCode: "SKU102",
                  quantity: 1,
                  price: 700,
                  mrp: 700
                }
              }
            ],

            billNetAmount: 1140, // sum of netAmounts of returned products
            billTaxAmount: 0,
            billAmount: 1140,

            paymentSplits: [
              {
                mode: "CASH",
                value: 0, // no extra payment, price equal
                excludeLoyaltyEarn: true
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "exchange@test.com",
            customerName: "Exchange Customer"
          }
        ]
      }
    ]
  }
];
