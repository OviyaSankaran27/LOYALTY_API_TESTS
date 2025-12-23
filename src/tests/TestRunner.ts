import testScenarios from "../data/testScenarios.json";
import * as billService from "../apis/billService";
import * as loyaltyService from "../apis/loyaltyService";
import * as customerService from "../apis/customerService";

console.log("🚀 Automation Started...");

class TestRunner {
  async run() {
    for (const testCase of testScenarios.cases) {
      console.log(`\n--- Running Case: ${testCase.id} ---`);

      // POST APIs
      for (const step of testCase.post) {
        try {
          switch (step.action) {
            case "upsertCustomer":
              await customerService.upsertCustomer(
                this.replace(step.data, testCase.mobile)
              );
              break;

            case "generateBill":
              await billService.generateBill(
                this.replace(step.data, testCase.mobile)
              );
              break;

            case "validateRedeem":
              await loyaltyService.validateRedeem(
                this.replace(step.data, testCase.mobile)
              );
              break;

            case "blockRedeem":
              await loyaltyService.blockRedeem(
                this.replace(step.data, testCase.mobile)
              );
              break;
          }
        } catch (err) {
          console.error("❌ POST Failed:", err);
        }
      }
    }

    // WAIT
    const waitMs = testScenarios.waitAfterPostMinutes * 60 * 1000;
    console.log(`⏳ Waiting ${testScenarios.waitAfterPostMinutes} minutes...`);
    await new Promise(res => setTimeout(res, waitMs));

    // VERIFY
    for (const testCase of testScenarios.cases) {
      const response = await customerService.getCustomer(testCase.mobile);
      const expected = testCase.verify.expected;

      let passed = true;
      for (const key in expected) {
        const actual = this.getValue(response, key);
        if (actual !== expected[key]) {
          passed = false;
          console.log(`❌ ${testCase.id} FAILED | ${key}`);
        }
      }

      if (passed) console.log(`✅ ${testCase.id} PASSED`);
    }
  }

  replace(obj: any, mobile: string) {
    return JSON.parse(JSON.stringify(obj).replace(/{{mobile}}/g, mobile));
  }

  getValue(obj: any, path: string) {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  }
}

new TestRunner().run();
