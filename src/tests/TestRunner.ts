import axios from "axios";
import { testCases } from "./data";
import api from "../config/axios";

async function runTests() {
  console.log("Starting Test Execution...\n");

  for (const tc of testCases) {
    console.log("\n==============================");
    console.log(`Executing ${tc.id}`);
    console.log("==============================");

    // -------- POST /bills --------
    try {
      console.log(`Sending POST /bills for ${tc.id}`);

      const postResponse = await api.post("/bills", tc.postPayload);

      console.log(`${tc.id} POST SUCCESS`);
      console.log("Response:", postResponse.data);
    } catch (err: any) {
      console.error(`${tc.id} POST FAILED`);
      console.error("Status:", err?.response?.status);
      console.error("Error:", err?.response?.data);
      continue; //  Skip GET if POST fails
    }

    // -------- WAIT (sync delay) --------
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // -------- GET /v2/customers --------
    try {
      console.log(`Sending GET /v2/customers for ${tc.id}`);

      const getResponse = await axios.get(
        "https://api.casaqa.ajira.tech/v2/customers",
        {
          params: {
            mobile: tc.getParams.mobile   //  THIS IS THE FIX
          },
          headers: {
            "Content-Type": "application/json",
            "api-key": "U0vwhQOnFz"
          }
        }
      );

      console.log(`${tc.id} GET SUCCESS`);
      console.log("Response:", getResponse.data);
    } catch (err: any) {
      console.error(`${tc.id} GET FAILED`);
      console.error("Status:", err?.response?.status);
      console.error("Error:", err?.response?.data);
    }
  }

  console.log("\nAll test cases executed.");
}

// -------- RUN --------
runTests().catch((err) => {
  console.error("Unexpected error:", err);
});
