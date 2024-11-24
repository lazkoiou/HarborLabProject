import { Page } from "@playwright/test";

/**
 * Base page POM which contains functionality which can be reusable among pages.
 */
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