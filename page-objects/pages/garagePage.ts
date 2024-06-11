import { expect, type Locator, type Page } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly signInForm: Locator;
  readonly signInFormEmailField: Locator;
  readonly signInPasswordField: Locator;
  readonly loginButton: Locator;
  readonly garagePageTitle: Locator;
  readonly addCarButton: Locator;
  readonly addCarModalWindow: Locator;
  readonly closeModalWindowButton: Locator;
  readonly carModelDropdown: Locator;
  readonly carMileageField: Locator;
  readonly addButton: Locator;
  readonly errorNote: Locator;
  readonly carName: Locator;
  readonly editIcon: Locator;
  readonly editCarModalWindow: Locator;
  readonly saveButton: Locator;
  readonly errorNotice: Locator;
  readonly updateMileageField: Locator;
  readonly updateButton: Locator;
  readonly successNotice: Locator;
  readonly createdAtDateField: Locator;
  readonly addFuelExpenseButton: Locator;
  readonly addAnExpenseModalWindow: Locator;
  readonly numberOfLitersField: Locator;
  readonly totalCostField: Locator;
  readonly reportDateField: Locator;
  readonly expenseMileageField: Locator;
  readonly fuelExpensesTab: Locator;
  readonly removeCarButton: Locator;
  readonly acceptCarRemovingButton: Locator;
  readonly vehicleDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('button.header_signin');
    this.signInForm = page.locator('.modal-title', { hasText: 'Log in'});
    this.signInFormEmailField = page.locator('#signinEmail');
    this.signInPasswordField = page.locator('#signinPassword');
    this.loginButton = page.locator('.btn-primary', {hasText:'Login'});
    this.garagePageTitle = page.locator('h1', {hasText:'Garage'});
    this.addCarButton = page.locator('.btn-primary', {hasText:'Add car'});
    this.addCarModalWindow = page.locator('h4.modal-title', {hasText:'Add a car'});
    this.closeModalWindowButton = page.locator('.close');
    this.carModelDropdown = page.locator('#addCarModel');
    this.carMileageField = page.locator('#addCarMileage');
    this.addButton = page.locator('.justify-content-end>.btn-primary', { hasText:'Add'});
    this.errorNote = page.locator('.invalid-feedback');
    this.carName = page.locator('p.car_name').first();
    this.editIcon = page.locator('.icon-edit').first();
    this.editCarModalWindow = page.locator('.modal-title', { hasText:'Edit a car'});
    this.saveButton = page.locator('.btn-primary', {hasText:'Save'});
    this.errorNotice = page.locator('.alert-danger');
    this.updateMileageField = page.locator('[name="miles"]').first();
    this.updateButton = page.locator('button.update-mileage-form_submit').first();
    this.successNotice = page.locator('.alert-success');
    this.createdAtDateField = page.locator('#carCreationDate');
    this.addFuelExpenseButton = page.locator('button.car_add-expense').first();
    this.addAnExpenseModalWindow = page.locator('.modal-title', { hasText:'Add an expense'});
    this.numberOfLitersField = page.locator('#addExpenseLiters');
    this.totalCostField = page.locator('#addExpenseTotalCost');
    this.reportDateField = page.locator('#addExpenseDate');
    this.expenseMileageField = page.locator('#addExpenseMileage');
    this.fuelExpensesTab = page.locator('.panel-page_heading>h1', { hasText:'Fuel expenses'});
    this.removeCarButton = page.locator('.btn-outline-danger');
    this.acceptCarRemovingButton = page.locator('.btn-danger');
    this.vehicleDropdown = page.locator('#addExpenseCar');
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async loginWithCredentials(email: string, password: string) {
    await this.signInFormEmailField.pressSequentially(email);
    await this.signInPasswordField.pressSequentially(password);
    await this.loginButton.click();
    await this.garagePageTitle.isVisible();
    await this.page.waitForTimeout(1000);
  }

  async clickAddCarButton() {
    await this.addCarButton.click();
    await this.addCarModalWindow.isVisible();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async selectQ7Model() {
    await this.carModelDropdown.selectOption('Q7');
  }

  async enterCarMileage(mileage: string) {
    await this.carMileageField.fill(mileage);
  }

  async clickEditIcon() {
    await this.editIcon.click();
    await this.editCarModalWindow.isVisible();
  }

  async enterUpdateMileage(mileage: string) {
    await this.updateMileageField.fill(mileage);
    await this.updateButton.click();
    await expect (this.successNotice.last()).toHaveText('Mileage updated');
  }

  async enterCreatedDate(date: string) {
    await this.createdAtDateField.fill(date);
  }

  async clickAddFuelExpenseButton() {
    await this.addFuelExpenseButton.click();
    await this.addAnExpenseModalWindow.isVisible();
  }

  async closeModalWindow() {
    await this.closeModalWindowButton.click();
  }

  async removeLastCar() {
    const carsNumberBefore = await this.editIcon.count();
    await this.clickEditIcon();
    await this.removeCarButton.click();
    await this.acceptCarRemovingButton.click();
    await expect(this.editIcon).toHaveCount(carsNumberBefore - 1);
  }

  async selectOptionOnVehicleDropdown() {
    await this.vehicleDropdown.selectOption('Audi Q7');
  }
}