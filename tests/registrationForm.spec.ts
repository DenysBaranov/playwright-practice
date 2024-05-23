import { test, expect } from '@playwright/test';
import { RegistrationForm } from '../page-objects/forms/registrationFormPOM';
import { correctEmail, incorrectEmail, correctPassword, incorrectPassword, numbersData, oneSymbolData } from '../test-data/registrationData';

let registrationForm: RegistrationForm;

test.beforeEach(async ({ page }) => {
      await page.goto('/');
      registrationForm = new RegistrationForm(page);
      await registrationForm.clickSignUpButton();
      registrationForm.registrationFormTitle;
});

test.describe('Testing Registration form', () => {
  
  test.describe('Successful user registration', () => {

    test.afterEach(async ({ page }) => {
      await registrationForm.clickCloseButton();
      await registrationForm.clickSignInButton();
      await registrationForm.loginWithCredentials(correctEmail, correctPassword);
      await registrationForm.clickMyProfileDropdown();
      await registrationForm.clickProfileSettingsItem();
      await registrationForm.clickRemoveMyAccountButton();
      await registrationForm.clickRemoveButton();
      await expect(page).toHaveURL('/');
    })

    test('Registration with correct data', async ({ page }) => {
      await registrationForm.nameField.fill('TestUserOne');
      await registrationForm.lastNameField.fill('LastName');
      await registrationForm.emailField.fill(correctEmail);
      await registrationForm.passwordField.fill(correctPassword);
      await registrationForm.reenterPasswordField.fill(correctPassword);
      await registrationForm.registerButton.click();
      await registrationForm.garagePage.isVisible();
    });
  })

  test.describe('Using "Name" field', () => {

    test('Leave name field blank', async ({ page }) => {
      await registrationForm.nameField.focus();
      await registrationForm.nameField.blur();
      await expect(registrationForm.errorNote).toHaveText('Name required');
    });

    test('Enter incorrect name', async ({ page }) => {
      await registrationForm.nameField.pressSequentially(numbersData);
      await registrationForm.lastNameField.focus();
      await expect(registrationForm.errorNote).toHaveText('Name is invalid');
    });

    test('Enter incorrect number of characters for the name', async ({ page }) => {
      await registrationForm.nameField.pressSequentially(oneSymbolData);
      await registrationForm.lastNameField.focus();
      await expect(registrationForm.errorNote).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Check border color of the name field', async ({ page }) => {
      await registrationForm.nameField.focus();
      await registrationForm.nameField.blur();
      await expect(registrationForm.nameField).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Last name" field', () => {

    test('Leave last name field blank', async ({ page }) => {
      await registrationForm.lastNameField.focus();
      await registrationForm.lastNameField.blur();
      await expect(registrationForm.errorNote).toHaveText('Last name required');
    });

    test('Enter incorrect last name', async ({ page }) => {
      await registrationForm.lastNameField.pressSequentially(numbersData);
      await registrationForm.emailField.focus();
      await expect(registrationForm.errorNote).toHaveText('Last name is invalid');
    });

    test('Enter incorrect number of characters for the last name', async ({ page }) => {
      await registrationForm.lastNameField.pressSequentially(oneSymbolData);
      await registrationForm.emailField.focus();
      await expect(registrationForm.errorNote).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Check border color of the last name field', async ({ page }) => {
      await registrationForm.lastNameField.focus();
      await registrationForm.lastNameField.blur();
      await expect(registrationForm.lastNameField).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Email" field', () => {

    test('Enter incorrect email', async ({ page }) => {
      await registrationForm.emailField.pressSequentially(incorrectEmail);
      await registrationForm.passwordField.focus();
      await expect(registrationForm.errorNote).toHaveText('Email is incorrect');     
    });

    test('Leave email field blank', async ({ page }) => {
      await registrationForm.emailField.focus();
      await registrationForm.emailField.blur();
      await expect(registrationForm.errorNote).toHaveText('Email required');
    });

    test('Check border color of the email field', async ({ page }) => {
      await registrationForm.emailField.focus();
      await registrationForm.emailField.blur();
      await expect(registrationForm.emailField).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Password" field', () => {

    test('Enter incorrect password', async ({ page }) => {
      await registrationForm.passwordField.pressSequentially(incorrectPassword);
      await registrationForm.reenterPasswordField.focus();
      await expect(registrationForm.errorNote).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Leave password field blank', async ({ page }) => {
      await registrationForm.passwordField.focus();
      await registrationForm.passwordField.blur();
      await expect(registrationForm.errorNote).toHaveText('Password required');
    });

    test('Check border color of the password field', async ({ page }) => {
      await registrationForm.passwordField.focus();
      await registrationForm.passwordField.blur();
      await expect(registrationForm.passwordField).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Re-enter password" field', () => {

    test('Enter non-matching password', async ({ page }) => {
      await registrationForm.passwordField.pressSequentially(correctPassword);
      await registrationForm.reenterPasswordField.pressSequentially('1234Test');
      await registrationForm.emailField.focus();
      await expect(registrationForm.errorNote).toHaveText('Passwords do not match');
    });

    test('Leave re-enter password field blank', async ({ page }) => {
      await registrationForm.passwordField.pressSequentially(correctPassword);
      await registrationForm.reenterPasswordField.focus();
      await registrationForm.reenterPasswordField.blur();
      await expect(registrationForm.errorNote).toHaveText('Re-enter password required');
    });

    test('Check border color of the re-enter password field', async ({ page }) => {
      await registrationForm.reenterPasswordField.focus();
      await registrationForm.reenterPasswordField.blur();
      await expect(registrationForm.reenterPasswordField).toHaveCSS('color','rgb(73, 80, 87)');
    });
  })

  test.describe('Using "Register" button', () => {

    test('Check disabled button', async ({ page }) => {
      await registrationForm.nameField.pressSequentially(numbersData);
      await registrationForm.lastNameField.pressSequentially(numbersData);
      await registrationForm.emailField.pressSequentially(incorrectEmail);
      await registrationForm.passwordField.pressSequentially(incorrectPassword);
      await registrationForm.reenterPasswordField.pressSequentially('1234Test');
      await expect(registrationForm.registerButton).toBeDisabled();
    });
  })
})