const { test } = require('@playwright/test');

test('smoke', async ({ page }) => {
  await page.goto('https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_copilot.htm&language=en_US&type=5&release=252');
  await page.waitForTimeout(3000);
  console.log('TITLE=', await page.title());
});
