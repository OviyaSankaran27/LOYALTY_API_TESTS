import * as customerService from "../apis/customerService";
import * as billService from "../apis/billService";
import { testScenarios } from "./data";

async function runTests() {
  console.log("-----------------------------------------");
  console.log("SYSTEM_LOG: INITIATING TEST SUITE");
  console.log("-----------------------------------------");

  for (const scenario of testScenarios) {
    console.log(`SCENARIO_START: ${scenario.id} - ${scenario.description}`);

    for (const testCase of scenario.cases) {
      try {
        console.log(`PROCESS: Executing ${testCase.action}`);

        const data: any = { ...testCase.data };

        switch (testCase.action) {

          // ================= PUSH BILL =================
          case "pushBill": {
            const payload = {
              billNumber: `BILL-${Date.now()}`,
              billGuid: `GUID-${Date.now()}`,
              invoiceType: "SALE",

              customerMobile: data.customerMobile,
              customerEmail: "test@gmail.com",

              storeCode: data.storeCode,
              channel: data.channel,
              billDate: data.billDate,
              currency: data.currency,

              billAmount: data.billAmount,
              netAmount: data.netAmount,
              taxAmount: data.taxAmount,

              paymentSplits: [
                {
                  paymentMode: "CASH",
                  amount: data.billAmount
                }
              ],

              orderItems: [
                {
                  skuCode: "S2474367",
                  quantity: 1,
                  price: 500,
                  tax: 90,
                  posProductInfo: {
                    price: 500,
                    mrp: 590
                  }
                }
              ]
            };

            console.log(
              "BILL REQUEST PAYLOAD:\n",
              JSON.stringify(payload, null, 2)
            );

            await billService.pushBill(payload);
            console.log("STATUS: SUCCESS - pushBill");
            break;
          }

          // ================= UPSERT CUSTOMER =================
          case "upsertCustomer":
            await customerService.upsertCustomer(data);
            console.log("STATUS: SUCCESS - upsertCustomer");
            break;

          // ================= GET CUSTOMER =================
          case "getCustomer":
            await customerService.getCustomer(data.mobile);
            console.log("STATUS: SUCCESS - getCustomer");
            break;

          default:
            console.log("WARNING: Unknown action ->", testCase.action);
        }
      } catch (error: any) {
        console.error(`STATUS: FAILED - ${testCase.action}`);
        console.error(
          error?.response?.data || error.message || error
        );
        return;
      }
    }
    console.log("-----------------------------------------");
  }

  console.log("SYSTEM_LOG: TEST SUITE FINISHED");
}

runTests();
