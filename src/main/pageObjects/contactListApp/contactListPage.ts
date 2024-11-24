import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

/**
 * POM for the Contact List page which contains all created contact forms
 */
export class ContactListPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get pageTitleWebElement() : Locator {
        return this.page.getByRole('heading', {name: 'Contact List'});
    }

    get addNewContactButtonWebElement() : Locator {
        return this.page.getByRole('button', {name: 'Add a New Contact'});
    }

    getRowByNameWebElement(name: string): Locator {
        return this.page.getByRole('row', {name: new RegExp(name)});
    }
    
};