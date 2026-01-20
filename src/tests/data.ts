export const testScenarios = [
  {
    id: "TC09_EXCHANGE_TWO_PRODUCTS_CHEAPER",
    description: "Exchange 2 products from a multiple product bill with new products cheaper than old products",
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
            billLevelOfferDiscount: 0,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 0,

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 800,
                productDiscount: 0,
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

            billNetAmount: 2100, // sum of netAmounts
            billTaxAmount: 0,
            billAmount: 2100,

            paymentSplits: [
              {
                mode: "CASH",
                value: 2100,
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

      // Exchange bill for 2 products with cheaper new products
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
                price: 800,
                mrp: 800,
                total: 800,
                netAmount: 800,
                productDiscount: 0,
                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,
                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,
                posProductInfo: { price: 800, mrp: 800 },
                exchangedWith: {
                  skuCode: "SKU101",
                  quantity: 1,
                  price: 500, // cheaper product
                  mrp: 500
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
                  price: 600, // cheaper product
                  mrp: 600
                }
              }
            ],

            billNetAmount: 1500, // sum of returned products = 800 + 700
            billTaxAmount: 0,
            billAmount: 1500,

            paymentSplits: [
              {
                mode: "CASH",
                value: 400, // refund for the price difference (2100 - 1500)
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
