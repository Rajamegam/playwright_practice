const { test } = require('@playwright/test')

test("login and check for request interception", async ({ page }) => {
    const email = "rajamegam1611@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();


    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route => {

        route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6798a1282342jfejdsj3' })
    })
    await page.locator("button:has-text('View')").first().click()
    await page.pause()

})