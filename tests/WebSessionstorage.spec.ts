import { test, expect, BrowserContext} from "@playwright/test"
import placeorder from "../TestData/placeorder.json"
const userEmail = placeorder[0].username
const userPassword = placeorder[0].password
const productName = placeorder[0].productName
let webContext: BrowserContext
test.beforeAll(async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill(userEmail);
     await page.locator("#userPassword").fill(userPassword);
     await page.locator("[value='Login']").click();
     await page.waitForLoadState('networkidle');
     await context.storageState({path: 'loginstate.json'})
     webContext = await browser.newContext({storageState: 'loginstate.json'})


} )


test('Client App login', async () => {
    //js file- Login js, DashboardPage
    const page = await webContext.newPage()
    
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent() ?? "";
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent() ?? "";
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent() ?? "";
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


});

test ( " test ", async ()=>{

    const page = await webContext.newPage()
    
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
   await page.waitForTimeout(15000)
})