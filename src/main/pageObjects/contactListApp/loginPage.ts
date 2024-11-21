import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class LoginPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    get headerTitleWebElement(): Locator {
      return this.page.getByRole('heading', { level: 1, name: 'Contact List App' });
    }
    
    get welcomeText1WebElement(): Locator {
      return this.page.getByText(
        'Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down.'
      );
    }
    
    get welcomeText2WebElement(): Locator {
      return this.page.getByText('The API documentation can be found');
    }
  
    get apiDocumentationUrlWebElement(): Locator {
      return this.page.getByRole('link', { name: 'here' });
    }

    get usernameInputWebElement(): Locator {
      return this.page.getByRole('textbox', { name: 'Email' });
    }

    get passwordInputWebElement(): Locator {
      return this.page.getByRole('textbox', { name: 'Password' });
    }

    get submitButtonWebElement(): Locator {
      return this.page.getByRole('button', { name: 'Submit' });
    }

    get validationErrorWebElement(): Locator {
      return this.page.getByText('Incorrect username or password');
    }

    get signUpButtonWebElement(): Locator {
      return this.page.getByRole('button', { name: 'Sign up' });
    }



}