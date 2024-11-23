import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class ContactListPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get pageTitleWebElement() : Locator {
        return this.page.getByRole('heading', {name: 'Contact List'});
    }

};