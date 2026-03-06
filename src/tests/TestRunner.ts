import { testCases } from "./data";
import api from "../config/axios";

async function runTests() {
  console.log("Starting Test Execution...\n");

  for (const tc of testCases as any[]) {

    console.log("\n==============================");
    console.log(`Executing ${tc.id}`);
    console.log("==============================");

    // -------- POST BILL --------
    try {

      console.log(`Sending POST /v2/bills for ${tc.id}`);

      const postResponse = await api.post("/v2/bills", tc.payload);

      console.log(`${tc.id} POST SUCCESS`);
      console.log("Response:", postResponse.data);

    } catch (err: any) {

      console.error(`${tc.id} POST FAILED`);
      console.error("Status:", err?.response?.status);
      console.error("Error:", err?.response?.data);

      continue;
    }

    // -------- WAIT --------
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // -------- GET CUSTOMER --------
    try {

      console.log(`Checking Customer ${tc.customerMobile}`);

      const getResponse = await api.get("customers", {
        params: {
          mobile: tc.customerMobile
        }
      });

      console.log(`${tc.id} GET SUCCESS`);
      console.log("Customer Data:", getResponse.data);

    } catch (err: any) {

      console.log(`${tc.id} GET FAILED`);
      console.log("Status:", err?.response?.status);
      console.log("Error:", err?.response?.data);

    }

  }

  console.log("\nAll test cases executed.");
}

runTests().catch((err) => {
  console.error("Unexpected error:", err);
});