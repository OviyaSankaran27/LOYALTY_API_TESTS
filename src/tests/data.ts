export const testScenarios = [
  {
    id: "TC05_RETURN_SINGLE",
    description: "Return Bill with single product",
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

            // Bill without discounts for simplicity
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
              }
            ],

            billNetAmount: 500,
            billTaxAmount: 0,
            billAmount: 500,

            paymentSplits: [
              {
                mode: "CASH",
                value: 500,
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
              }
            ],

            billNetAmount: 500,
            billTaxAmount: 0,
            billAmount: 500,

            paymentSplits: [
              {
                mode: "CASH",
                value: 500,
                excludeLoyaltyEarn: true // No loyalty earned for returns
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
