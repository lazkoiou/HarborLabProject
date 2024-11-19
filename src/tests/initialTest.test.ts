import { test, expect, Page } from '@playwright/test';
import { POManager } from '../main/pageObjects/poManager';
import * as dotenv from 'dotenv';

dotenv.config(); // load environmental values from .env files

test.describe('Initial Test', async () => {
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

  test('Should have correct title', async() => {
    console.log("Test");
  });

});