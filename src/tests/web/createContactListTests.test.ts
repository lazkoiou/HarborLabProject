import { test, expect, Page, request } from '@playwright/test';
import { POManager } from '../../main/pageObjects/poManager';
import * as dotenv from 'dotenv';
import { UserDTO } from '../../main/api/contactListApp/dtos/userDTO';
import { ClientManager } from '../../main/api/contactListApp/clients/clientManager';
import { UsersService } from '../../main/api/contactListApp/services/usersService';
import { ContactFormDTO } from '../../main/api/contactListApp/dtos/contactFormDTO';

dotenv.config(); // load environmental values from .env files

test.describe('Create Contact List Tests', async () => {
  let page: Page;
  let poManager: POManager;
  let clientManager: ClientManager;

  test.beforeEach(async ({ browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    const requestContext = await request.newContext();
    clientManager = new ClientManager(requestContext);
    
    await page.goto(process.env.CONTACT_LIST_LOGIN_URL as string);
  });
  
  test.afterEach(async() => {
    await page.close();
  });

  test('Create contact list _expect_ list created @smoke @web @contactFormList', async() => {
    let bearerToken: string | null = null;
    const usersService = new UsersService(clientManager.usersClient);
    const userDTO = UserDTO.getRandomDefaultUser();
    try { // Preparation: Create user through the API for faster execution
        const responseData = await usersService.createUser(userDTO);
        bearerToken = responseData.token;
        await poManager.loginPage.usernameInputWebElement.fill(userDTO.email);
        await poManager.loginPage.passwordInputWebElement.fill(userDTO.password);
        await poManager.loginPage.submitButtonWebElement.click();
        await poManager.contactListPage.addNewContactButtonWebElement.click();
        // Actual test starts here
        await poManager.addContactFormPage.firstNameInputWebElement.fill(ContactFormDTO.getDefaultContactForm().firstName);
        await poManager.addContactFormPage.lastNameInputWebElement.fill(ContactFormDTO.getDefaultContactForm().lastName);
        await poManager.addContactFormPage.submitButtonWebElement.click();
        const name = ContactFormDTO.getDefaultContactForm().firstName + ' ' + ContactFormDTO.getDefaultContactForm().lastName;
        (await poManager.contactListPage.getRowByNameWebElement(name)).waitFor();
        await expect((await poManager.contactListPage.getRowByNameWebElement(name)).first()).toBeVisible();
    }
    finally { // Cleanup: Delete previously created user
      if (bearerToken != null) {
          await usersService.deleteUser(bearerToken, userDTO);
        }
      }
  });

  /**
   * Lots of additional tests can be added here:
   * - check all fields have been saved with correct values
   * - adding the same contact (if allowed or not)
   * - logout from API (or another tab) and try to create a new form
   * etc
   */

});