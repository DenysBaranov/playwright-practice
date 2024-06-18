import { test, expect } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';


test.describe('Garage page tests with mocking API', () => {
    let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    await page.goto('/');
})
  
  test('Check profile username', async ({ page }) => {

    const resp = {
        "status": "ok",
        "data": {
            "userId": 112407,
            "photoFilename": "default-user.png",
            "name": "Joe",
            "lastName": "Biden",
            "dateBirth": "2024-01-01T00:00:00.000Z",
            "country": "Ukraine"
        }
    }

    await page.route('**/api/users/profile', route => route.fulfill({
        status: 200,
        body: JSON.stringify(resp),
    }));
    
    await page.locator('button.header_signin').click();
    await page.locator('#signinEmail').fill('mail123@gmail.com');
    await page.locator('#signinPassword').fill('Test1234');
    await page.locator('.btn-primary', {hasText:'Login'}).click();
    await page.locator('a.-profile').click();
    await expect(page.locator('p.profile_name')).toHaveText('Joe Biden');
  });
})