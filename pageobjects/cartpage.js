class cartpage {
    constructor(page,expect) {
        this.page = page
        this.expect=expect
        this.cartproducttext = page.locator("h3:has-text('Banarsi Saree')")
        this.checkoutbutton = page.locator("text=Checkout")

    }
    async checkout() {
        const bool = this.cartproducttext.isVisible();
        this.expect(bool).toBeTruthy();
        await this.checkoutbutton.click();
    }
}
module.exports = { cartpage }