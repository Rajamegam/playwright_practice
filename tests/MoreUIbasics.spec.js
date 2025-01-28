const { test, expect } = require('@playwright/test')

test("handing visible and hidden elements", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    expect(await page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    expect(await page.locator("#displayed-text")).toBeHidden()


})

test("Handing popup", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.on('dialog', dialog => dialog.accept())
    await page.locator('#confirmbtn').click()


})
test("mousehover", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.locator("#mousehover").hover()


})

test("frames", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const frames =  page.frameLocator("#courses-iframe")
    await frames.getByRole('link',{name:"All Access plan"}).click()
    const subscriber_text = await frames.locator(".text h2").textContent()
    const subscriber_count = await subscriber_text.split(" ")[1]
    console.log(subscriber_count)




})
test.only("handing visible and hidden elementsto check screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    expect(await page.locator("#displayed-text")).toBeVisible()
    await page.screenshot({path:'screenshot.png'})
    await page.locator("#hide-textbox").click()
    expect(await page.locator("#displayed-text")).toBeHidden()


})