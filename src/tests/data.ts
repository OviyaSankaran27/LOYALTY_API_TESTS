export const testScenarios = [
  {
    id: "TC01",
    description: "Invoice with single product including tax and bill details",
    cases: [
      {
        action: "pushBill",
        data: {
          billNumber: "AUTO",
          billGuid: "AUTO",
          invoiceType: "SALE",

          customerMobile: "9876543210",
          customerEmail: "test@gmail.com",

          storeCode: "IMP",
          channel: "POS",
          currency: "INR",
          billDate: new Date().toISOString(),

          netAmount: 500,
          taxAmount: 90,
          billAmount: 590,

          orderItems: [
            {
              skuCode: "SKU001",
              quantity: 1,
              price: 500,
              tax: 90,
              posProductInfo: {
                price: 500,
                mrp: 590
              }
            }
          ],

          paymentSplits: [
            {
              paymentMode: "CASH",
              amount: 590
            }
          ]
        }
      },

      {
        action: "upsertCustomer",
        data: {
          mobile: "9876543210",
          name: "Test User",
          email: "test@gmail.com"
        }
      },

      {
        action: "getCustomer",
        data: {
          mobile: "9876543210"
        }
      }
    ]
  }
];
