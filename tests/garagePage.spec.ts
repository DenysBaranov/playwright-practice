import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtureBase';

test.describe('Garage page tests', () => {
  
  test('Leave the Mileage field blank', async ({ garagePage }) => {
    await garagePage.clickAddCarButton();
    await garagePage.carMileageField.focus();
    await garagePage.carMileageField.blur();
    await expect(garagePage.errorNote).toHaveText('Mileage cost required');
    await garagePage.closeModalWindow();
  });

  test('Enter a negative number in the Mileage field', async ({ garagePage }) => {
    await garagePage.clickAddCarButton();
    await garagePage.carMileageField.fill('-123');
    await garagePage.carMileageField.blur();
    await expect(garagePage.errorNote).toHaveText('Mileage has to be from 0 to 999999');
    await garagePage.closeModalWindow();
  });

  test('Edit car with enter less mileage', async ({ garagePage }) => {
    await garagePage.clickEditIcon();
    await garagePage.enterCarMileage('99');
    await garagePage.saveButton.click();
    await expect(garagePage.errorNotice).toHaveText('New mileage is less then previous entry');
    await garagePage.closeModalWindow();
  });

  test('Update mileage', async ({ garagePage }) => {
    await garagePage.enterUpdateMileage('234');
    });

  test('Change the car creation date', async ({ garagePage }) => {
    await garagePage.clickEditIcon();
    await garagePage.enterCreatedDate('27.05.2024');
    await garagePage.saveButton.click();
    await expect (garagePage.successNotice.last()).toHaveText('Car updated'); 
    });

  test('When adding expenses, leave the "Number of liters" field blank', async ({ garagePage }) => {
    await garagePage.clickAddFuelExpenseButton();
    await garagePage.numberOfLitersField.focus();
    await garagePage.numberOfLitersField.blur();
    await expect(garagePage.errorNote).toHaveText('Liters required');
    await garagePage.closeModalWindow();
    });

  test('When adding expenses, leave the "Total cost" field blank', async ({ garagePage }) => { 
    await garagePage.clickAddFuelExpenseButton();
    await garagePage.totalCostField.focus();
    await garagePage.totalCostField.blur();
    await expect(garagePage.errorNote).toHaveText('Total cost required');
    await garagePage.closeModalWindow();
  });

  test('Add the number of liters and total cost to expenses', async ({ page, garagePage }) => {
    await garagePage.clickAddFuelExpenseButton();
    await garagePage.selectOptionOnVehicleDropdown();
    await garagePage.expenseMileageField.fill('234');
    await garagePage.numberOfLitersField.fill('345');
    await garagePage.totalCostField.fill('555');
    await garagePage.clickAddButton();
    await expect(garagePage.fuelExpensesTab).toBeVisible();
    await page.goto('/');
  });

  test('Add a report date to expenses earlier than the creation date', async ({ garagePage }) => {
    await garagePage.clickAddFuelExpenseButton();
    await garagePage.reportDateField.fill('01.01.2024');
    await garagePage.numberOfLitersField.fill('345');
    await garagePage.totalCostField.fill('777');
    await garagePage.clickAddButton();
    await expect(garagePage.errorNotice).toContainText('New expense date must not be less than car creation date. Car creation date is');   
    await garagePage.closeModalWindow();
  }); 
})