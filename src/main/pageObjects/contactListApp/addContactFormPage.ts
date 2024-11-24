import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

/**
 * POM for the Add Contact Form page where a user can create a new contact
 */
export class AddContactFormPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get headerTitleWebElement(): Locator {
        return this.page.getByRole('heading', { level: 1, name: 'Add Contact' });
    }

    // Mandatory inputs

    get firstNameInputWebElement(): Locator {
        return this.page.getByRole('textbox', { name: 'First Name' });
    }

    get lastNameInputWebElement(): Locator {
        return this.page.getByRole('textbox', { name: 'Last Name' });
    }

    // All non-mandatory inputs could be added here - leaving it out of scope for this project

    get submitButtonWebElement(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    get cancelButtonWebElement(): Locator {
        return this.page.getByRole('heading', { level: 1, name: 'Cancel' });
    }

}