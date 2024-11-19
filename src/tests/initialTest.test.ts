import { test, expect, Page } from '@playwright/test';
import { POManager } from '../main/pageObjects/poManager';
import * as dotenv from 'dotenv';

dotenv.config(); // load environmental values from .env files

test.describe('Login Page Tests', async () => {
  let page: Page;
  let poManager: POManager;

  test.beforeAll(async ({ browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    await page.goto(process.env.CONTACT_LIST_LOGIN_URL as string);
  });
  
  test.afterAll(async() => {
    await page.close();
  });

  test('Should have correct texts and links', async() => {
    await expect(poManager.getLoginPage().headerTitleWebElement).toBeVisible();
    await expect(poManager.getLoginPage().welcomeText1WebElement).toBeVisible();
    await expect(poManager.getLoginPage().welcomeText2WebElement).toBeVisible();
    expect(await poManager.getLoginPage().apiDocumentationUrlWebElement.getAttribute('href')).toBe(process.env.API_DOCUMENTATION_URL as string);
    // Similar assertions can take place for the rest of the texts of this page for exhaustive testing,
    // which I believe are not needed for this assignment's purpose.
  });

});