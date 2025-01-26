class APiUtils {


    constructor(request, login_payload) {

        this.request = request
        this.login_payload = login_payload
    }

    async getToken() {
        const response = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.login_payload,
        });

        expect(response.ok()).toBeTruthy();

        const login_response_JSON = await response.json();
        token_value = login_response_JSON.token;

        console.log("Token Value:", token_value);
        return token_value


    }
    async createOrder(order_payload) {
        let response = {}
        response.token = await this.getToken()
        const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: this.order_payload,
            headers: {
                "authorization": response.token,
                "Content-Type": "application/json"
            }
        })
        expect(orderResponse.ok()).toBeTruthy()
        const orderResponseJson = await orderResponse.json()
        const orderID_Detail = orderResponseJson.orders[0]
        response.orderID_Detail = orderID_Detail
        return response
    }
}
export default { APiUtils }