import { Page } from "playwright/test";
import { LoginPage } from "./contactListApp/loginPage";

/**
 * Class used to handle POMs
 */
export class POManager {


    private readonly page: Page;
    private readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

}