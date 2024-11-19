import { Page } from "@playwright/test";

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Used for waiting, which in certain cases is vital for the flakiness
     * or the test itself.
     * @param timeInSeconds : time in seconds that we want to wait 
     */
    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }

}