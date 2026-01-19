export const testScenarios = [
  {
    id: "TC07_REDEEM_3POINTS",
    description: "Invoice of 100 amount with 3 loyalty points redemption",
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

            // Discounts
            billLevelOfferDiscount: 0,
            billLevelProductDiscount: 0,
            billLevelFooterDiscount: 0,
            billLevelLoyaltyDiscount: 3,   //  Redeem 3 points
            totalDiscountAmount: 3,         // only loyalty discount

            orderItems: [
              {
                skuCode: "SKU100",
                quantity: 1,
                price: 100,
                mrp: 100,
                total: 100,
                netAmount: 97,   // after 3 points redeemed
                productDiscount: 0,

                IGSTAmt: 0,
                CGSTAmt: 0,
                SGSTAmt: 0,
                CESSAmt: 0,

                IGSTRate: 0,
                CGSTRate: 0,
                SGSTRate: 0,
                CESSRate: 0,

                posProductInfo: { price: 100, mrp: 100 }
              }
            ],

            billNetAmount: 100,
            billTaxAmount: 0,
            billAmount: 97,  

            paymentSplits: [
              {
                mode: "CASH",
                value: 97,
                excludeLoyaltyEarn: true   
              }
            ],

            loyaltyRedeem: {
              points: 3,
              amount: 3,
              reason: "Redeem 3 points for bill"
            },

            storeCode: "IMP",
            customerMobile: "8838530066",
            customerEmail: "testing@test.com",
            customerName: "Redeem Customer"
          }
        ]
      }
    ]
  }
];
