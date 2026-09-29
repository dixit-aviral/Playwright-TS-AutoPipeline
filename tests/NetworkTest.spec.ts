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


    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a3bb39e378febeacdc98135', async route => {

        const response = await page.request.fetch(route.request())
        let body = fakePayloadOrdres;
        route.fulfill(

            {
                status: response.status(),
                headers: response.headers(),
                body: JSON.stringify(body),

            }
        )


    })
    await page.locator("button[routerlink*='myorders']").click();
    // await page.locator('tbody').waitFor();

    // const rows = page.locator('tbody tr');
    // for (let i = 0; i < await rows.count(); ++i) {
    //     const rowOrderId = (await rows.nth(i).locator('th').textContent()) ?? '';
    //     if (APIOrderID.includes(rowOrderId)) {
    //         console.log('Order found in table');
    //         await rows.nth(i).locator('button').first().click();
    //         break;
    //     }
    // }

    // const orderIdDetails = (await page.locator('.col-text').textContent()) ?? '';
    // expect(APIOrderID.includes(orderIdDetails)).toBeTruthy();

    await page.waitForTimeout(20000)
});
