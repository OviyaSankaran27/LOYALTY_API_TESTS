export const testScenarios = [
  {
    id: "TC10_EXCHANGE_TWO_PRODUCTS_EXPENSIVE",
    description: "Exchange 2 products from a multiple product bill with new products more expensive than old products",
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

            billLevelOfferDiscount: 0,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 0,

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 500,
                mrp: 500,
                total: 500,
                netAmount: 500,
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
                netAmount: 700,
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

            billNetAmount: 1800, // sum of netAmounts
            billTaxAmount: 0,
            billAmount: 1800,

            paymentSplits: [
              {
                mode: "CASH",
                value: 1800,
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

      // Exchange bill for 2 products with more expensive new products
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
                netAmount: 500,
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
                  price: 700, // more expensive product
                  mrp: 700
                }
              },
              {
                skuCode: "SKU002",
                quantity: 1,
                price: 700,
                mrp: 700,
                total: 700,
                netAmount: 700,
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
                  price: 900, // more expensive product
                  mrp: 900
                }
              }
            ],

            billNetAmount: 1200, // sum of old product netAmounts
            billTaxAmount: 0,
            billAmount: 1200,

            paymentSplits: [
              {
                mode: "CASH",
                value: 400, // extra payment needed (700+900 - 500-700 = 400)
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
