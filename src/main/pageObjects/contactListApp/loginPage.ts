import { Page } from "@playwright/test";
import { BasePage } from "../basePage";


export class LoginPage extends BasePage{


    constructor(page: Page) {
        super(page);
    }

}