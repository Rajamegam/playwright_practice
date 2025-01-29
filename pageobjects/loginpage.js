class LoginPage {


    constructor(page) {
        this.page = page
        this.username = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.signInbutton = page.locator("#login")


    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client")

    }
    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage }