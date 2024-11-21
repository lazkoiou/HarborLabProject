import { Page } from "playwright/test";
import { LoginPage } from "./contactListApp/loginPage";
import { AddUserPage } from "./contactListApp/addUserPage";

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

}