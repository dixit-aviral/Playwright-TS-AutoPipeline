import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager'
import placeorder from '../TestData/placeorder.json'

for (const data of placeorder)
{
test(`Client App login ${data.productName}`, async ({ page }) => {
  const pom = new POManager(page);
  //js file- Login js, DashboardPage
  const username: string = data.username;
  const password: string = data.password;
  const productName: string = data.productName;

  const products = page.locator(".card-body");
  const loginPage = pom.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  const dashboardPage = pom.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

  const cartPage = pom.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

  const ordersReviewPage = pom.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  
  const orderId = await ordersReviewPage.SubmitAndGetOrderId()??""; 
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = pom.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  const orderidfromorderhistorypage= await ordersHistoryPage.getOrderId()?? "";
  expect(orderId.includes(orderidfromorderhistorypage)).toBeTruthy();


})}