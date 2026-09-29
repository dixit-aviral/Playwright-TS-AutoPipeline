import { expect, request } from "@playwright/test";
import APITestDAta from "../../TestData/APITestDAta.json"

const LoginAPIURL = APITestDAta.BaseAPIURL.concat(APITestDAta.LoginAPIendpoint)
const createOrderAPIURL = APITestDAta.BaseAPIURL.concat(APITestDAta.OrderAPIendpoint)
export class APICalls {
    constructor() {
    }

    async loginAPICall(APIUsername: string, APIPassword: string) {
        const LoginAPIRequest = await request.newContext()
        const LoginAPIPayload = { userEmail: APIUsername, userPassword: APIPassword };
        const APILoginResponse = await LoginAPIRequest.post(LoginAPIURL, { data: LoginAPIPayload })
        expect(APILoginResponse.ok()).toBeTruthy()
        const APIresponseJSON = await APILoginResponse.json()
        const LoginAPITOken = APIresponseJSON.token
        return LoginAPITOken

    }


    async createOrderAPICall(APIUsername: string, APIPassword: string, OrderCountry: string, OrderProductID: string) {
        const OrderAPIPayload = { orders: [{ country: OrderCountry, productOrderedId: OrderProductID }] };
        const createOrderAPIRequest = await request.newContext()
        const loginToken = await this.loginAPICall(APIUsername, APIPassword)
        const creteOrderAPIresponse = await createOrderAPIRequest.post(createOrderAPIURL, {
            data: OrderAPIPayload,
            headers: { 'Authorization': loginToken, 'Content-Type': 'application/json' },
        })
        const orderAPIResponseJson = await creteOrderAPIresponse.json()
        const APIorderID = orderAPIResponseJson.orders?.[0] ?? "";
        return APIorderID

    }
}