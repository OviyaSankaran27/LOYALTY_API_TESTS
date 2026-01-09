import * as billService from "../apis/billService";
import { testScenarios } from "./data";

async function runTests() {
  console.log("=========================================");
  console.log("SYSTEM_LOG: TEST SUITE STARTED");
  console.log("=========================================");

  for (const scenario of testScenarios) {
    console.log(`SCENARIO: ${scenario.id} - ${scenario.description}`);

    for (const testCase of scenario.cases) {
      try {
        console.log(`ACTION: ${testCase.action}`);

        if (testCase.action === "pushBill") {
          console.log(
            "REQUEST PAYLOAD:\n",
            JSON.stringify(testCase.data, null, 2)
          );

          const response: any = await billService.pushBill(testCase.data);

          if (
            response?.success
            // || JSON.stringify(response).toLowerCase().includes("success")
          ) {
            console.log("STATUS: pushBill SUCCESS");
            console.log(response);
            console.log(response.data)
          } else {
            console.error(" STATUS: pushBill FAILED");
            console.error(response);
          }
        }
      } catch (error: any) {
        console.error(" TEST FAILED");
        console.error(error?.response?.data || error.message || error);
        return;
      }
    }
  }

  console.log("=========================================");
  console.log("SYSTEM_LOG: TEST SUITE FINISHED");
  console.log("=========================================");
}

runTests();
