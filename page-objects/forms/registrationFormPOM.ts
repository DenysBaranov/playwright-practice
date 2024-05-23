import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationForm {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly registrationFormTitle: Locator;
  readonly closeButton: Locator;
  readonly signInButton: Locator;
  readonly signInForm: Locator;
  readonly signInFormEmailField: Locator;
  readonly signInPasswordField: Locator;
  readonly loginButton: Locator;
  readonly myProfileDropdown: Locator;
  readonly profileSettings: Locator;
  readonly removeMyAccountButton: Locator;
  readonly removeButton: Locator;
  readonly nameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly reenterPasswordField: Locator;
  readonly errorNote: Locator;
  readonly registerButton: Locator;
  readonly garagePage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator('.btn-primary');
    this.registrationFormTitle = page.locator('.modal-title', { hasText: 'Registration'});
    this.closeButton = page.locator('.close');
    this.signInButton = page.locator('button.header_signin');
    this.signInForm = page.locator('.modal-title', { hasText: 'Log in'});
    this.signInFormEmailField = page.locator('#signinEmail');
    this.signInPasswordField = page.locator('#signinPassword');
    this.loginButton = page.locator('.btn-primary', {hasText:'Login'});
    this.myProfileDropdown = page.locator('#userNavDropdown');
    this.profileSettings = page.locator('.user-nav_link', {hasText:'Settings'});
    this.removeMyAccountButton = page.locator('.btn-danger-bg');
    this.removeButton = page.locator('.btn-danger');
    this.nameField = page.locator('#signupName');
    this.errorNote = page.locator('.invalid-feedback');
    this.lastNameField = page.locator('#signupLastName');
    this.emailField = page.locator('#signupEmail');
    this.passwordField = page.locator('#signupPassword');
    this.reenterPasswordField = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.btn-primary', { hasText: 'Register'});
    this.garagePage = page.locator('h1', { hasText: 'Garage'});
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async loginWithCredentials(email: string, password: string) {
    await this.signInFormEmailField.pressSequentially(email);
    await this.signInPasswordField.pressSequentially(password);
    await this.loginButton.click();
  }

  async clickMyProfileDropdown () {
    await this.myProfileDropdown.click();
  }

  async clickProfileSettingsItem() {
    await this.profileSettings.click();
  }

  async clickRemoveMyAccountButton() {
    await this.removeMyAccountButton.click();
  }

  async clickRemoveButton() {
    await this.removeButton.click();
  }
}