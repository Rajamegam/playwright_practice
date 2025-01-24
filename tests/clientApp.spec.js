const { test } = require('@playwright/test')
const { spec } = require('@playwright/test')

test("app", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("rajamegam1611@gmail.com")
    await page.locator("#userPassword").fill("Test@123")
    await page.locator("[value='Login']").click()
    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body>h5>b").first().waitFor()
    const Title = await page.locator(".card-body>h5>b").allTextContents()
    console.log(Title)

})