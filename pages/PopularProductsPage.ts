import { Page, Locator } from '@playwright/test';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class PopularProductsPage {
    readonly page: Page;
    readonly heading: Locator

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator(GlobalConstants.iFramePath).contentFrame().getByRole('heading', { name: 'Popular Products' })
    }
}
