import { Page, Locator } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

export class ArtPage extends BaseCategoryPage {
    readonly topMenuLink: Locator;

    constructor(page: Page) {
        super(page, 'Art');

        this.topMenuLink = this.frame.getByRole('link', {
            name: 'Art',
            exact: true,
        });
    }

    async navigateFromTopMenu(): Promise<void> {
        await this.topMenuLink.click();
    }
}
