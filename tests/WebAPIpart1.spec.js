const { test, request, expect } = require('@playwright/test')
const {ApiUtils} = require('../Utils/ApiUtils');
const login_payload = { userEmail: "rajamegam1611@gmail.com", userPassword: "Test@123" }
const order_payload = { orders: [{ country: "Cuba", productOrderedId: "676a631fe2b5443b1f004a20" }] }
let response


test.beforeAll(async ({ request }) => {
    const apiUtils = new ApiUtils(request, login_payload)
    response = await apiUtils.createOrder(order_payload)

})

test("endtoend", async ({ page }) => {
    page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, response.token);

    const product_name = "Banarsi Saree";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator("h1").waitFor()
    const rows = await page.locator("tbody tr");
    const ordercount = await rows.count();

    for (let i = 0; i < ordercount; i++) {
        const orderID = await rows.nth(i).locator("th").textContent();
        if (orderID === response.orderID_Detail) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.pause()

})
