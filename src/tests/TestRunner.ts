import * as billService from "../apis/billService";
import * as loyaltyService from "../apis/loyaltyService";
import * as customerService from "../apis/customerService";

const testScenarios: any = require("../data/testScenarios.json");

class TestRunner {
  async run() {
    console.log("🚀 Automation Started...");
    for (const testCase of testScenarios.cases) {
      console.log(`\n--- Running Case: ${testCase.id} ---`);

      for (const post of testCase.post) {
        await this.executePost(post, testCase.mobile);
      }

      const waitTime = testScenarios.waitAfterPostMinutes || 0.1;
      console.log(`⏳ Waiting ${waitTime} min...`);
      await new Promise(res => setTimeout(res, waitTime * 60000));

      await this.verify(testCase);
    }
  }

  async executePost(post: any, mobile: string) {
    switch(post.action) {
      case "upsertCustomer":
        await customerService.upsertCustomer(post.data);
        break;

      case "getCustomer":
        await customerService.getCustomers(post.data.mobile);
        break;

      case "validateRedeem":
        await loyaltyService.validateRedeem(post.data);
        break;

      case "blockRedeem":
        await loyaltyService.blockRedeem(post.data);
        break;

      case "generateBill":
      case "pushBill":
        await billService.generateBill({ ...post.data, customerMobile: mobile });
        break;

      case "setLoyaltyConfig":
        await loyaltyService.setLoyaltyExclusionConfig(post.configKey);
        break;

      default:
        console.log(`⚠️ Unknown action: ${post.action}`);
    }
  }

  async verify(testCase: any) {
    if (!testCase.verify) return;

    const response = await customerService.getCustomers(testCase.mobile);
    const expected = testCase.verify.expected?.["loyalty.group.points"];
    const actual = response?.data?.loyalty?.group?.points;

    if (actual === expected) {
      console.log(`✅ ${testCase.id} PASSED`);
    } else {
      console.log(`❌ ${testCase.id} FAILED: Expected ${expected}, Got ${actual}`);
    }
  }
}

new TestRunner().run().catch(err => console.error(err));
