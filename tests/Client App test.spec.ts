import { expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager'
import placeorder from '../TestData/placeorder.json'
import { test } from '../tests/Fixtures/Fixture';

    
    test(`Client App login 1`, async ({ loggedInPage }) => {
        const pom = new POManager(loggedInPage);
        const productName = placeorder[1].productName


        const dashboardPage = pom.getDashboardPage();
        await dashboardPage.searchProductAddCart(productName); 
        await dashboardPage.navigateToCart();

        const cartPage = pom.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();

        const ordersReviewPage = pom.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        const orderId = await ordersReviewPage.SubmitAndGetOrderId() ?? "";
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = pom.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        const orderidfromorderhistorypage = await ordersHistoryPage.getOrderId() ?? "";
        expect(orderId.includes(orderidfromorderhistorypage)).toBeTruthy();


    })
