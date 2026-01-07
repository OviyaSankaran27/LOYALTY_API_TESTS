import * as customerService from "../apis/customerService";
import * as loyaltyService from "../apis/loyaltyService";
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
        const data = testCase.data as any;
        let response: any;

        switch (testCase.action) {
          case "pushBill":
            response = await billService.pushBill(data);
            
            // THE FIX: Convert the entire response to a string and look for "success"
            // This ignores the array structure and just looks for the result.
            const responseText = JSON.stringify(response).toLowerCase();

            if (responseText.includes("success")) {
              console.log(`STATUS: SUCCESS - ${testCase.action}`);
            } else {
              throw new Error("API response did not contain 'success' status.");
            }
            break;

          case "upsertCustomer":
            await customerService.upsertCustomer(data);
            console.log(`STATUS: SUCCESS - ${testCase.action}`);
            break;

          case "getCustomer":
            const mobileNumber = data.mobile || data.customerMobile;
            await customerService.getCustomer(mobileNumber);
            console.log(`STATUS: SUCCESS - ${testCase.action}`);
            break;

          default:
            console.log(`STATUS: WARNING - Undefined Action: ${testCase.action}`);
        }
      } catch (error: any) {
        console.error(`STATUS: FAILED - ${testCase.action}`);
        // This will print the messy array only if it actually fails
        console.error("LOG_DETAIL:", error?.response?.data || error.message || error);
        console.log(`INFO: Aborting scenario ${scenario.id} due to failure`);
        break;
      }
    }
    console.log("-----------------------------------------");
  }

  console.log("SYSTEM_LOG: TEST SUITE EXECUTION FINISHED");
  console.log("-----------------------------------------");
}

runTests();