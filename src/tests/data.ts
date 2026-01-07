export const testScenarios = [
  {
    id: "TC01",
    description: "Invoice with single product including tax and bill details",
    cases: [
      {
        action: "pushBill",
        data: {
          billNumber: `BILL-${Date.now()}`,
          billDate: new Date().toISOString().split('T')[0],
          storeCode: "STORE-001",
          customerMobile: "8838530066",
          billAmount: 1100,
          taxAmount: 100,
          items: [
            {
              skuCode: "PROD-001",
              quantity: 1,
              price: 1000,
              taxPercent: 10,
              posProductInfo: {
                mrp: 1100,
                price: 1000
              }
            }
          ]
        }
      }
    ]
  }
];