const { LoginPage } = require('../pageobjects/loginpage')
const { DashboardPage } = require('../pageobjects/Dashboardpage')
const { cartpage } = require('../pageobjects/cartpage')
const { paymentpage } = require('../pageobjects/paymentpage')

class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.dashboardpage = new DashboardPage(page)
        this.cart = new cartpage(page, expect)
        this.paymentPage = new paymentpage(page, expect)
    }
    getLoginPage() {
        return this.loginPage
    }
    getdashboardPage() {
        return this.dashboardpage
    }
    getcartpage() {
        return this.cart
    }
    getpaymentpage() {
        return this.paymentPage
    }

}
module.exports = { POManager }
