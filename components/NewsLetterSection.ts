import { FrameLocator, Locator, Page } from '@playwright/test';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class NewsLetterSection {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly root: Locator;
    readonly inputField: Locator;
    readonly subscribeButton: Locator;
    readonly newsLetterAlert: Locator;

    constructor(page: Page, frame: FrameLocator) {
        this.frame = frame;
        this.root = this.frame.locator('div.col-md-7.col-xs-12')
        this.page = page;
        this.inputField = this.root.locator('[name="email"]')
        this.subscribeButton = this.root.locator("//input[@value='Subscribe']")
        this.newsLetterAlert = frame.locator('p.block_newsletter_alert');
    }

    async typeEmail(email: string): Promise<void> {
        await this.inputField.fill(email)
    }

    async subscribe(): Promise<void> {
        await this.subscribeButton.click();
    }

    async readAllertMessage(): Promise<string> {
        return await this.newsLetterAlert.textContent() ?? '';
    }
}