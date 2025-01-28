const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

let webContext
const email = "rajamegam1611@gmail.com"


test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.context().storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
})

test("endtoend", async () => {
    const product_name = "Banarsi Saree";
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const product_list = await page.locator("h5 b").allTextContents();
    console.log(product_list);
    const card_body = await page.locator(".card-body").count();
    for (let i = 0; i < card_body; i++) {
        if (await page.locator(".card-body").nth(i).locator('b').textContent() === product_name) {
            await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
            break;
        }

    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('Banarsi Saree')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("form>div>div:first-child>div>input").fill(" ");
    await page.locator("form>div>div:first-child>div>input").fill("1111 2222 3333 4444");
    await page.locator("form>div>div:nth-child(2)>div>select").first().selectOption('03');
    await page.locator("form>div>div:nth-child(2)>div>select").last().selectOption('31');
    await page.locator("form>div>div:nth-child(2)>div:nth-child(2)>input").fill('334');
    await page.locator("form>div>div:nth-child(3)>div>input").fill("rajamegam");
    await page.locator("form>div>div:nth-child(4)>div>input").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await page.locator("[style='color: green;']").waitFor();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const dropdown = await page.locator("[class*='results']");
    await dropdown.waitFor();
    const optionscount = await page.locator(".ta-item").count();
    for (let i = 0; i < optionscount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
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
