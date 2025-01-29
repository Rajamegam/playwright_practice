class ApiUtils {

    constructor(request, login_payload) {
        this.request = request
        this.login_payload = login_payload
    }


    async getToken() {
        const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.login_payload })
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token
        console.log(token)
        return token
    }


    async createOrder(order_payload) {
        let response = {}
        response.token = await this.getToken()
        const orderCreationResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderCreationPayload,
            headers: {
                "Authorization": response.token,
                "Content-type": "application/json"
            }

        })
        const orderCreationResponseJson = await orderCreationResponse.json()
        const orderIDDetail = orderCreationResponseJson.orders[0]
        console.log(orderIDDetail)
        response.orderIDDetail = orderIDDetail
        return response


    }
}
module.exports = ApiUtils 