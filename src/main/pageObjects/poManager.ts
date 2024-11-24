import { Page } from "playwright/test";
import { LoginPage } from "./contactListApp/loginPage";
import { AddUserPage } from "./contactListApp/addUserPage";
import { ContactListPage } from "./contactListApp/contactListPage";
import { AddContactFormPage } from "./contactListApp/addContactFormPage";

/**
 * Class used to handle POMs
 */
export class POManager {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get loginPage(): LoginPage {
        return new LoginPage(this.page);
    }

    get addUserPage(): AddUserPage {
        return new AddUserPage(this.page);
    }

    get contactListPage(): ContactListPage {
        return new ContactListPage(this.page);
    }

    get addContactFormPage(): AddContactFormPage {
        return new AddContactFormPage(this.page);
    }

}