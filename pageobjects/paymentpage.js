class paymentpage {
    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.creditCardNumber = page.locator("form>div>div:first-child>div>input")
        this.expiryDate = page.locator("form>div>div:nth-child(2)>div>select")
        this.expiryMonth = page.locator("form>div>div:nth-child(2)>div>select")
        this.cvv = page.locator("form>div>div:nth-child(2)>div:nth-child(2)>input")
        this.creditCardName = page.locator("form>div>div:nth-child(3)>div>input")
        this.promotionalCode = page.locator("form>div>div:nth-child(4)>div>input")
        this.applyPromotionButton = page.locator("button[type='submit']")
        this.confirmationMessage = page.locator("[style='color: green;']")
        this.mailIDCheck = page.locator(".user__name [type='text']")
        this.selectCountryname = page.locator("[placeholder*='Country']")
        this.countryOptions = page.locator("[class*='results']")
        this.placeorderbutton = page.locator(".action__submit")


    }
    async enterCreditCardDetails(creditcardnumber, date, month, cvv, name, promotionalcode) {
        await this.creditCardNumber.fill(" ");
        await this.creditCardNumber.fill(creditcardnumber);
        await this.expiryDate.first().selectOption(date);
        await this.expiryMonth.last().selectOption(month);
        await this.cvv.fill(cvv);
        await this.creditCardName.fill(name);
        await this.promotionalCode.fill(promotionalcode);
        await this.applyPromotionButton.click();
        await this.confirmationMessage.waitFor();

    }
    async selectCountry(email) {
        await this.expect(this.mailIDCheck.first()).toHaveText(email)
        await this.selectCountryname.pressSequentially("Ind");
        const dropdown = await this.countryOptions;
        await dropdown.waitFor();
        const optionscount = await this.page.locator(".ta-item").count();
        for (let i = 0; i < optionscount; i++) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }
    async placeorder() {
        this.placeorderbutton.click()
    }
}
module.exports = { paymentpage }