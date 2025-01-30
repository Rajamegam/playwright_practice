const { LoginPage } = require('../pageobjects/loginpage')
const { DashboardPage } = require('../pageobjects/Dashboardpage')
const { cartpage } = require('../pageobjects/cartpage')
const { paymentpage } = require('../pageobjects/paymentpage')

exports.POManager = class POManager {
    constructor(page,expect) {
        this.page = page
        this.expect=expect
        this.loginPage = new LoginPage(page)
        this.dashboardpage = new DashboardPage(page)
        this.cartpage = new cartpage(page, expect)
        this.paymentPage = new paymentpage(page, expect)
    }
    getLoginPage() {
        return this.loginPage
    }   
    getdashboardPage() {
        return this.dashboardpage
    }
    getcartpage() {
        return this.cartpage
    }
    getpaymentpage() {
        return this.paymentPage
    }

}