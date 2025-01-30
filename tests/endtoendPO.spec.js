const { test, expect } = require('@playwright/test');
// const { POManager } = require('../pageobjects/POManager')
const {POManager}=require('../pageobjects/POManager');
const exp = require('constants');
const dataset=JSON.parse(JSON.stringify(require('../Utils/testdata.json')))



test("endtoend", async ({ page }) => {
    const product_name = "Banarsi Saree";
    const email = "rajamegam1611@gmail.com"
    const password = "Test@123"
    const creditcardnumber = "1111 2222 3333 4444"
    const date = "03"
    const month = "31"
    const cvv = "334"
    const name = "rajamegam"
    const promtionalcode = "rahulshettyacademy"

    const po=new POManager(page,expect)
    const loginPage=po.getLoginPage()
    await loginPage.goto()
    await loginPage.validLogin(dataset.username, dataset.password)

    const dashboardpage = po.getdashboardPage()
    await dashboardpage.productSearch(dataset.product) 
    await dashboardpage.navigateToCart()

    const cart = po.getcartpage()
    await cart.checkout()

    const paymentPage = po.getpaymentpage()
    await paymentPage.enterCreditCardDetails(creditcardnumber, date, month, cvv, name, promtionalcode)
    await paymentPage.selectCountry(email)
    await paymentPage.placeorder()

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const order_ID = await page.locator("label[class='ng-star-inserted']").textContent();
    const orderID_Detail = order_ID.split("| ")[1].split(" ")[0];
    console.log(orderID_Detail);
    await page.locator("ul li:nth-child(3)").click();
    await page.locator("h1").waitFor()
    const rows = await page.locator("tbody tr");
    const ordercount = await rows.count();

    for (let i = 0; i < ordercount; i++) {
        const orderID = await rows.nth(i).locator("th").textContent();
        if (orderID === orderID_Detail) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    await page.pause()

})
