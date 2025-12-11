import { Page, Locator } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

export class AccessoriesPage extends BaseCategoryPage {
    readonly topMenuLink: Locator;
    readonly stationerySubcategory: Locator;
    readonly homeAccessoriesSubcategory: Locator;

    constructor(page: Page) {
        super(page, 'Accessories');

        this.topMenuLink = this.frame.getByRole('link', {
            name: 'Accessories',
            exact: true,
        });

        this.stationerySubcategory = this.subcategoryByName('Stationery');
        this.homeAccessoriesSubcategory = this.subcategoryByName('Home Accessories');
    }

    async navigateFromTopMenu(): Promise<void> {
        await this.topMenuLink.click();
    }

    async openStationery(): Promise<void> {
        await this.stationerySubcategory.click();
    }

    async openHomeAccessories(): Promise<void> {
        await this.homeAccessoriesSubcategory.click();
    }
}
