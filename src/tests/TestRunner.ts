// src/tests/TestRunner.ts

import * as customerService from "../apis/customerService";
import * as loyaltyService from "../apis/loyaltyService";
import * as billService from "../apis/billService";
import { testScenarios } from "./data";

async function runTests() {
  for (const scenario of testScenarios) {
    console.log(`\nRunning scenario: ${scenario.id} - ${scenario.description}`);

    for (const caseItem of scenario.cases) {
      const action = caseItem.action;
      let result = null;

      try {
        switch (action) {
          case "getCustomer":
            result = await customerService.getCustomers(caseItem.data.mobile);
            break;

          case "upsertCustomer":
            result = await customerService.upsertCustomer(caseItem.data);
            break;

          case "validateRedeem":
            result = await loyaltyService.validateRedeem(caseItem.data);
            break;

          case "blockRedeem":
            result = await loyaltyService.blockRedeem(caseItem.data);
            break;

          case "pushBill":
            result = await billService.pushBill(caseItem.data);
            break;

          case "setLoyaltyConfig":
            console.log(" setLoyaltyConfig API not implemented yet");
            break;

          case "generateBill":
            console.log(" generateBill API not implemented yet");
            break;

          default:
            console.log(`Unknown action: ${action}`);
        }

        console.log(` ${action} success:`, result);
      } catch (err: any) {
        console.log(`${action} failed:`, err.message);
      }
    }
  }
}

runTests();
