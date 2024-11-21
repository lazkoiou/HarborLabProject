import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class AddUserPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    get headerTitleWebElement(): Locator {
        return this.page.getByRole('heading', {level: 1, name: 'Add User'});
    }

    get subTitleWebElement(): Locator {
        return this.page.getByText('Sign up to begin adding your contacts!');
    }

    get firstNameInputWebElement(): Locator {
        return this.page.getByRole('textbox', {name: 'First Name'});
    }

    get lastNameInputWebElement(): Locator {
        return this.page.getByRole('textbox', {name: 'Last Name'});
    }

    get emailInputWebElement(): Locator {
        return this.page.getByRole('textbox', {name: 'Email'});
    }

    get passwordInputWebElement(): Locator {
        return this.page.getByRole('textbox', {name: 'Password'});
    }

    get validationErrorWebElement(): Locator {
        return this.page.getByText('User validation failed', { exact: false });
    }

    get submitButtonWebElement(): Locator {
        return this.page.getByRole('button', {name: 'Submit'});
    }

    get cancelButtonWebElement(): Locator {
        return this.page.getByRole('button', {name: 'Cancel'});
    }

}