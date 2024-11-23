import { test, expect, Page, request } from '@playwright/test';
import { POManager } from '../../main/pageObjects/poManager';
import * as dotenv from 'dotenv';
import { UserDTO } from '../../main/api/contactListApp/dtos/userDTO';
import { ClientManager } from '../../main/api/contactListApp/clients/clientManager';
import { UsersService } from '../../main/api/contactListApp/services/usersService';

dotenv.config(); // load environmental values from .env files

test.describe('Add User Web Page Tests', async () => {
  let page: Page;
  let poManager: POManager;
  let clientManager: ClientManager;

  test.beforeEach(async ({ browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    const requestContext = await request.newContext();
    clientManager = new ClientManager(requestContext);
    
    await page.goto(process.env.CONTACT_LIST_ADD_USER_URL as string);
  });
  
  test.afterEach(async() => {
    await page.close();
  });

  test('Page _should_ correct texts, links @regression @web @addUser', async() => {
    await expect(poManager.addUserPage.headerTitleWebElement).toBeVisible();
    await expect(poManager.addUserPage.subTitleWebElement).toBeVisible();
    // Similar assertions can take place for the rest of the texts of this page for exhaustive testing,
    // which I believe are not needed for this assignment's purpose.
    // Also, we can add an assertion about the displayed image.
  });

  test('No input add user _should_ validation error @smoke @web @addUser', async() => {
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

  test('Sign up cancel _should_ no created user @smoke @web @addUser', async() => {
    const userDTO = UserDTO.getRandomDefaultUser();
    // Fill form and click 'Cancel'
    await poManager.addUserPage.firstNameInputWebElement.fill(userDTO.firstName);
    await poManager.addUserPage.lastNameInputWebElement.fill(userDTO.lastName);
    await poManager.addUserPage.emailInputWebElement.fill(userDTO.email);
    await poManager.addUserPage.passwordInputWebElement.fill(userDTO.password);
    await poManager.addUserPage.cancelButtonWebElement.click();
    // We are redirected to login page
    expect(page.url()).toBe(process.env.CONTACT_LIST_LOGIN_URL as string);
    // Assert user has not been created through an API call 
    const usersService = new UsersService(clientManager.usersClient);
    await expect(usersService.loginUser(userDTO.email, userDTO.password)).rejects.toThrow("Failed to login user with status: 401");
  });

  test('Sign up user _should_ create user @smoke @web @addUser', async() => {
    const userDTO = UserDTO.getRandomDefaultUser();
    await poManager.addUserPage.firstNameInputWebElement.fill(userDTO.firstName);
    await poManager.addUserPage.lastNameInputWebElement.fill(userDTO.lastName);
    await poManager.addUserPage.emailInputWebElement.fill(userDTO.email);
    await poManager.addUserPage.passwordInputWebElement.fill(userDTO.password);
    await poManager.addUserPage.submitButtonWebElement.click();
    await expect(poManager.contactListPage.pageTitleWebElement).toBeVisible();

    // Cleanup: login to get bearer token and delete user
    const usersService = new UsersService(clientManager.usersClient);
    const bearerToken = await usersService.loginUser(userDTO.email, userDTO.password);
    await usersService.deleteUser(bearerToken, userDTO);
  });

  // Additional notes:
  // Input validation tests for all fields could be included - Not supported by the UI tested
  //  - e.g. email input without '@'
  //  - non latin characters
  //  - very big input in username or password

});