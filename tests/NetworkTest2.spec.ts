import { expect, test, request } from '@playwright/test';
import APITestData from '../TestData/APITestDAta.json';
import { APICalls } from './API Utils/APICalls';

const APIUsername = APITestData.username;
const APIPassword = APITestData.password;
const OrderCountry = APITestData.OrderCountry;
const OrderProductID = APITestData.OrderProduct;
const fakePayloadOrdres = { data: [], message: "No Orders" }
let loginToken = '';
let APIOrderID = '';



test.beforeAll(async () => {

    const APICall = new APICalls()
    loginToken = await APICall.loginAPICall(APIUsername, APIPassword);

    APIOrderID = await APICall.createOrderAPICall(APIUsername, APIPassword, OrderCountry, OrderProductID)
});

test('Client App login', async ({ page }) => {

    await page.addInitScript((token: string) => {
        window.localStorage.setItem('token', token);
    }, loginToken);

    await page.goto('https://rahulshettyacademy.com/client');



    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

    await page.waitForTimeout(20000)
});
