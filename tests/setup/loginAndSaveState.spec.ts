import { test, expect } from '@playwright/test';
import { GaragePage } from '../../page-objects/pages/garagePage';


test.describe('Garage tests', () => {
    let garagePage: GaragePage;

    test ('Login as User and save state', async ({page}) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.clickSignInButton();
        await garagePage.signInForm.isVisible();
        await garagePage.loginWithCredentials('mail123@gmail.com', 'Test1234');
        await page.context().storageState({
            path:'userOneState.json'
        })
    })
})