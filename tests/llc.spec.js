const { test, expect } = require('@playwright/test')

test("Playwright special locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByLabel("Employed").check()
    await page.getByPlaceholder("Password").fill("Test@123")
    await page.getByRole("button",{name:'submit'}).click()
    const success_message_visible=await page.getByText("Success! The Form has been submitted successfully!").isVisible()
    expect(success_message_visible).toBeTruthy()
    await page.getByRole("link",{name:"Shop"}).click()
    await page.locator("app-card").filter({hasText:"Blackberry"}).getByRole("button").click()
})