const { test } = require('@playwright/test')
const { expect } = require('@playwright/test');
const exp = require('constants');

test.only("Context based browser open", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    page.route('**/*.css',route=>route.abort())
    //const cardtitle = "page.locator('h4 a')"
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").fill("rahulshettyacademy")
    await page.locator("[type='password']").fill("learning")
    await page.locator("#signInBtn").click()
    //console.log(await page.locator("[style*='block']").textContent())
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    console.log(await page.locator('h4 a').first().textContent())
    console.log(await page.locator('h4 a').last().textContent())
    const product_titles = await page.locator('h4 a').allTextContents()
    console.log(product_titles)

});


test("page based browser open", async ({ page }) => {
    await page.goto("https://google.com")
    await page.title()
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")

})

test("UI controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const username = page.locator('#username')
    const password = page.locator('#password')
    const documentlink = page.locator("a[href*='documents-request']")
    const selectdropdown = page.locator("select.form-control")
    await username.fill("rahulshettyacademy")
    await password.fill("learning")
    await page.locator(".checkmark").last().click()
    await page.locator("#okayBtn").click()
    await selectdropdown.selectOption("consult")
    await page.locator('#terms').check()
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(page.locator(".checkmark").last()).toBeChecked()
    await page.locator("input[name='signin']").click()
    await expect(documentlink).toHaveAttribute("class", "blinkingText")



})

test("child window controls", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const documentlink = page.locator("a[href*='documents-request']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const [newPage] = await Promise.all(
        [context.waitForEvent('page'),
        documentlink.click(),

        ])
    const text = await newPage.locator(".red").textContent()
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain)
    await page.locator("#username").fill(domain)

})