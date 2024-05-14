import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.locator('.btn-primary').click();
      page.locator('.modal-title', { hasText: 'Registration'});
});

test.describe('Testing Registration form', () => {

  test.describe('Successful user registration', () => {

    test('Registration with correct data', async ({ page }) => {
      await page.locator('#signupName').fill('TestUserOne');
      await page.locator('#signupLastName').fill('LastName');
      await page.locator('#signupEmail').fill('mail123+1@gmail.com');
      await page.locator('#signupPassword').fill('Test1234');
      await page.locator('#signupRepeatPassword').fill('Test1234');
      await page.locator('.btn-primary', { hasText: 'Register'}).click();
      await page.locator('h1', { hasText: 'Garage'}).isVisible();
    });

    test('Delete user after successful registration', async ({page}) => {
      await page.locator('.close').click();
      await page.locator('button.header_signin').click();
      await page.locator('#signinEmail').pressSequentially('mail123+1@gmail.com');
      await page.locator('#signinPassword').pressSequentially('Test1234');
      await page.locator('.btn-primary', {hasText:'Login'}).click();
      await page.locator('#userNavDropdown').click();
      await page.locator('.user-nav_link', {hasText:'Settings'}).click();
      await page.locator('.btn-danger-bg').click();
      await page.locator('.btn-danger').click();
      await expect(page).toHaveURL('/');
    });
  })

  test.describe('Using "Name" field', () => {

    test('Leave name field blank', async ({ page }) => {
      await page.locator('#signupName').focus();
      await page.locator('#signupName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Name required');
    });

    test('Enter incorrect name', async ({ page }) => {
      await page.locator('#signupName').pressSequentially('123');
      await page.locator('#signupLastName').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
    });

    test('Enter incorrect number of characters for the name', async ({ page }) => {
      await page.locator('#signupName').pressSequentially('A');
      await page.locator('#signupLastName').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Check border color of the name field', async ({ page }) => {
      await page.locator('#signupName').focus();
      await page.locator('#signupName').blur();
      await expect(page.locator('#signupName')).toHaveCSS('color','rgb(73, 80, 87)'); 
    });
  })

  test.describe('Using "Last name" field', () => {

    test('Leave last name field blank', async ({ page }) => {
      await page.locator('#signupLastName').focus();
      await page.locator('#signupLastName').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name required');
    });

    test('Enter incorrect last name', async ({ page }) => {
      await page.locator('#signupLastName').pressSequentially('123');
      await page.locator('#signupEmail').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
    });

    test('Enter incorrect number of characters for the last name', async ({ page }) => {
      await page.locator('#signupLastName').pressSequentially('A');
      await page.locator('#signupEmail').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Check border color of the last name field', async ({ page }) => {
      await page.locator('#signupLastName').focus();
      await page.locator('#signupLastName').blur();
      await expect(page.locator('#signupLastName')).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Email" field', () => {

    test('Enter incorrect email', async ({ page }) => {
      await page.locator('#signupEmail').pressSequentially('mail.mail.com');
      await page.locator('#signupPassword').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');     
    });

    test('Leave email field blank', async ({ page }) => {
      await page.locator('#signupEmail').focus();
      await page.locator('#signupEmail').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Email required');
    });

    test('Check border color of the email field', async ({ page }) => {
      await page.locator('#signupEmail').focus();
      await page.locator('#signupEmail').blur();
      await expect(page.locator('#signupEmail')).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Password" field', () => {

    test('Enter incorrect password', async ({ page }) => {
      await page.locator('#signupPassword').pressSequentially('password');
      await page.locator('#signupRepeatPassword').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');     
    });

    test('Leave password field blank', async ({ page }) => {
      await page.locator('#signupPassword').focus();
      await page.locator('#signupPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Password required');
    });

    test('Check border color of the password field', async ({ page }) => {
      await page.locator('#signupPassword').focus();
      await page.locator('#signupPassword').blur();
      await expect(page.locator('#signupPassword')).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Re-enter password" field', () => {

    test('Enter non-matching password', async ({ page }) => {
      await page.locator('#signupPassword').pressSequentially('Test1234');
      await page.locator('#signupRepeatPassword').pressSequentially('1234Test');
      await page.locator('#signupEmail').focus();
      await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
    });

    test('Leave re-enter password field blank', async ({ page }) => {
      await page.locator('#signupPassword').pressSequentially('Test1234');
      await page.locator('#signupRepeatPassword').focus();
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Re-enter password required');
    });

    test('Check border color of the re-enter password field', async ({ page }) => {
      await page.locator('#signupRepeatPassword').focus();
      await page.locator('#signupRepeatPassword').blur();
      await expect(page.locator('#signupPassword')).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Register" button', () => {

    test('Check disabled button', async ({ page }) => {
      await page.locator('#signupName').pressSequentially('123');
      await page.locator('#signupLastName').pressSequentially('123');
      await page.locator('#signupEmail').pressSequentially('mail.mail.com');
      await page.locator('#signupPassword').pressSequentially('password');
      await page.locator('#signupRepeatPassword').pressSequentially('1234Test');
      await expect(page.locator('.btn-primary', { hasText: 'Register'})).toBeDisabled();
    });
  })
})