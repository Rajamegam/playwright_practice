const { test, expect, request } = require('@playwright/test');
const { text } = require('stream/consumers');
const { writeHeapSnapshot } = require('v8');


const loginPayload = { userEmail: "rajamegam1611@gmail.com", userPassword: "Test@123" }
const orderCreationPayload = { orders: [{ country: "Cuba", productOrderedId: "676a631fe2b5443b1f004a20" }] }
let token
let orderIDDetail

test.beforeAll("Login", async ({ request }) => {
    const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload })
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token
    console.log(token)

})

test.beforeAll("placeOrder", async ({ request }) => {
    const orderCreationResponse = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderCreationPayload,
        headers: {
            "Authorization": token,
            "Content-type": "application/json"
        }

    })
    expect(orderCreationResponse.ok()).toBeTruthy()
    const orderCreationResponseJson = await orderCreationResponse.json()
    orderIDDetail = orderCreationResponseJson.orders[0]
    console.log(orderIDDetail)


})

test("endtoend", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token)
    const product_name = "Banarsi Saree";
    const email = "rajamegam1611@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("h1").waitFor()
    const rows = await page.locator("tbody tr");
    const ordercount = await rows.count();
    for (let i = 0; i < ordercount; i++) {
        const orderID = await rows.nth(i).locator("th").textContent();
        if (orderID === orderIDDetail) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.pause()

})
