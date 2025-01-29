class DashboardPage {

    constructor(page) {
        this.page = page
        this.productText = page.locator("h5 b")
        this.cardbody = page.locator(".card-body")
        this.cart = page.locator("[routerlink*='cart']")


    }
    async productSearch(product_name) {
        const product_list = await this.productText.allTextContents();
        console.log(product_list);
        const card_body = await this.cardbody.count();
        for (let i = 0; i < card_body; i++) {
            if (await this.cardbody.nth(i).locator('b').textContent() === product_name) {
                await this.cardbody.nth(i).locator("text= Add To Cart").click();
                break;
            }

        }
    }
    async navigateToCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();

    }
}
module.exports = { DashboardPage }