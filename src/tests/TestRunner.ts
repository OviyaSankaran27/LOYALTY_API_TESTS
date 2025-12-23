import scenarios from "../data/testScenarios.json";
import * as customerService from "../apis/customerService";
import * as loyaltyService from "../apis/loyaltyService";
import * as billService from "../apis/billService";

class TestRunner {
  async run() {
    console.log("🚀 TEST RUN STARTED");

    for (const tc of scenarios.cases) {
      console.log(`\n🧪 Running ${tc.id}`);

      // POST FLOW
      for (const step of tc.post) {
        try {
          const data = this.replaceMobile(step.data, tc.mobile);

          if (step.action === "upsertCustomer") {
            await customerService.upsertCustomer(data);
          }

          if (step.action === "validateRedeem") {
            await loyaltyService.validateRedeem(data);
          }

          if (step.action === "blockRedeem") {
            await loyaltyService.blockRedeem(data);
          }

          if (step.action === "generateBill") {
            await billService.generateBill(data);
          }

          console.log(`✅ ${step.action} success`);
        } catch (err: any) {
          console.error(`❌ ${step.action} failed`);
          console.error(err.response?.data || err.message);
        }
      }
    }

    // WAIT
    const waitMs = scenarios.waitAfterPostMinutes * 60 * 1000;
    console.log(`⏳ Waiting ${scenarios.waitAfterPostMinutes} minutes`);
    await new Promise(res => setTimeout(res, waitMs));

    // VERIFY
    for (const tc of scenarios.cases) {
      try {
        const res = await customerService.getCustomer(tc.mobile);
        console.log(`✅ VERIFY PASSED for ${tc.id}`);
        console.log(res.data);
      } catch (err: any) {
        console.error(`❌ VERIFY FAILED for ${tc.id}`);
        console.error(err.response?.data || err.message);
      }
    }
  }

  replaceMobile(obj: any, mobile: string) {
    return JSON.parse(JSON.stringify(obj).replace(/{{mobile}}/g, mobile));
  }
}

new TestRunner().run();
