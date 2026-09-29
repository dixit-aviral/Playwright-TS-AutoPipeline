// Fixtures/Fixture.ts
import { test as base } from '@playwright/test';
import { POManager } from '../../PageObjects/POManager';
import placeorder from '../../TestData/placeorder.json';

const Username = placeorder[1].username;
const Password = placeorder[1].password;

type MyFixtures = {
  loggedInPage: import('@playwright/test').Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const pom = new POManager(page);
    const loginPage = pom.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(Username,Password
    );

    // Hand over the authenticated page
    await use(page);
  },
});
