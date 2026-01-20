export const testScenarios = [
  {
    id: "TC07_RETURN_MULTIPLE_BILLDISCOUNT",
    description: "Return of multiple products from a bill with bill-level discount",
    cases: [
      // Original bill with multiple products and a bill-level discount
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

            // Bill-level discount
            billLevelOfferDiscount: 100,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 0,
            totalDiscountAmount: 100, // only bill-level

            orderItems: [
              {
                skuCode: "SKU001",
                quantity: 1,
                price: 500,
                mrp: 500,
                total: 500,
                netAmount: 450, // after proportional bill-level discount
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
                netAmount: 630, // after proportional bill-level discount
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
              }
            ],

            billNetAmount: 1080, // sum of netAmounts
            billTaxAmount: 0,
            billAmount: 1080,

            paymentSplits: [
              {
                mode: "CASH",
                value: 1080,
                excludeLoyaltyEarn: false
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "return@test.com",
            customerName: "Return Customer"
          }
        ]
      },

      // Return bill with multiple products
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
                price: 500,
                mrp: 500,
                total: 500,
                netAmount: 450, // proportional discount applied
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
                netAmount: 630, // proportional discount applied
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
              }
            ],

            billNetAmount: 1080, // total net of returned products
            billTaxAmount: 0,
            billAmount: 1080,

            paymentSplits: [
              {
                mode: "CASH",
                value: 1080,
                excludeLoyaltyEarn: true
              }
            ],

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "return@test.com",
            customerName: "Return Customer"
          }
        ]
      }
    ]
  }
];
