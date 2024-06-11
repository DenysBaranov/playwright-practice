import { test as base } from '@playwright/test'
import { GaragePage } from '../page-objects/pages/garagePage';
import { expect } from '@playwright/test';

export const test = base.extend({

    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await page.goto('/panel/garage');   
        // await garagePage.clickSignInButton();
        // await garagePage.signInForm.isVisible();
        // await garagePage.loginWithCredentials('mail123@gmail.com', 'Test1234');

        await garagePage.clickAddCarButton();
        await garagePage.selectQ7Model();
        await garagePage.enterCarMileage('123');
        await garagePage.clickAddButton();
        await expect(garagePage.carName).toHaveText('Audi Q7');
        await use(garagePage);

        await garagePage.removeLastCar();
    }
});