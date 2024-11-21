import { test, expect, Page } from '@playwright/test';
import { POManager } from '../../main/pageObjects/poManager';
import * as dotenv from 'dotenv';

dotenv.config(); // load environmental values from .env files

test.describe('Add User Page Tests', async () => {
  let page: Page;
  let poManager: POManager;

  test.beforeEach(async ({ browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    await page.goto(process.env.CONTACT_LIST_ADD_USER_URL as string);
  });
  
  test.afterEach(async() => {
    await page.close();
  });

  test('Should have correct texts and links @regression @web @addUser', async() => {
    await expect(poManager.addUserPage.headerTitleWebElement).toBeVisible();
    await expect(poManager.addUserPage.subTitleWebElement).toBeVisible();
    // Similar assertions can take place for the rest of the texts of this page for exhaustive testing,
    // which I believe are not needed for this assignment's purpose.
    // Also, we can add an assertion about the displayed image.
  });

  test('Add user with no input should throw validation @smoke @web @addUser', async() => {
    await poManager.addUserPage.submitButtonWebElement.click();
    await expect(poManager.addUserPage.validationErrorWebElement).toContainText('User validation failed');
    // Similar tests can be written here for exhaustive testing with @regression tag:
    // We have 4 mandatory input fields: the test cases will
    // 1. leave only 1 empty field
    // 2. fill the rest of them 
    // 3. submit to catch the validation error
    // I believe are not needed for this assignment's purpose, so I limited the implementation to just one such
    // case where I leave all of them empty.
  });

  test('Cancelling sign up should redirect to login page with user not created @smoke @web @addUser', async() => {
    // fill form and click 'Cancel'
    await poManager.addUserPage.firstNameInputWebElement.fill('cancelUserFirstName');
    await poManager.addUserPage.lastNameInputWebElement.fill('cancelUserLastName');
    await poManager.addUserPage.emailInputWebElement.fill('cancelUserEmail@gmail.com');
    await poManager.addUserPage.passwordInputWebElement.fill('cancelPassword');
    await poManager.addUserPage.cancelButtonWebElement.click();
    // we are redirected to login page
    expect(page.url()).toBe(process.env.CONTACT_LIST_LOGIN_URL as string);
    // TODO: assert user has not been created through an API call 
  });

  // TODO Happy path where you sign up a user, verify user has been created with an API call, delete the user

  // Additional notes:
  // Input validation tests for all fields could be included - Not supported by the UI tested
  //  - e.g. email input without '@'
  //  - non latin characters
  //  - very big input in username or password

  // TODO: Happy login path with created user though API

});