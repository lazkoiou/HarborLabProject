import { test, expect, Page } from '@playwright/test';
import { POManager } from '../../main/pageObjects/poManager';
import * as dotenv from 'dotenv';

dotenv.config(); // load environmental values from .env files

test.describe('Login Page Tests', async () => {
  let page: Page;
  let poManager: POManager;

  test.beforeEach(async ({ browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    await page.goto(process.env.CONTACT_LIST_LOGIN_URL as string);
  });
  
  test.afterEach(async() => {
    await page.close();
  });

  test('Should have correct texts and links @regression @frontend @login', async() => {
    await expect(poManager.loginPage.headerTitleWebElement).toBeVisible();
    await expect(poManager.loginPage.welcomeText1WebElement).toBeVisible();
    await expect(poManager.loginPage.welcomeText2WebElement).toBeVisible();
    expect(await poManager.loginPage.apiDocumentationUrlWebElement.getAttribute('href')).toBe(process.env.API_DOCUMENTATION_URL as string);
    // Similar assertions can take place for the rest of the texts of this page for exhaustive testing,
    // which I believe are not needed for this assignment's purpose.
    // Also, we can add an assertion about the displayed image.
  });

  test('Login with non existing user should throw validation @smoke @frontend @login', async() => {
    await poManager.loginPage.usernameInputWebElement.fill('nonexistentuser@gmail.com');
    await poManager.loginPage.passwordInputWebElement.fill('nonexistentpassword');
    await poManager.loginPage.submitButtonWebElement.click();
    await expect(poManager.loginPage.validationErrorWebElement).toHaveText('Incorrect username or password');
  });

  test('Login with no user input should throw validation @smoke @frontend @login', async() => {
    await poManager.loginPage.submitButtonWebElement.click();
    await expect(poManager.loginPage.validationErrorWebElement).toHaveText('Incorrect username or password');
  });

  test('Clicking on sign up button should redirect to registration page @smoke @frontend @login', async() => {
    await poManager.loginPage.signUpButtonWebElement.click();
    expect(page.url()).toBe(process.env.CONTACT_LIST_ADD_USER_URL as string);
    await expect(poManager.addUserPage.headerTitleWebElement).toHaveText('Add User');
  });

  // Additional notes:
  // Username and password validation tests could be included - Not supported by the UI tested
  //  - e.g. input without '@'
  //  - non latin characters
  //  - empty username field
  //  - empty password field
  //  - very big input in username or password

  // TODO: Happy login path with created user though API

});