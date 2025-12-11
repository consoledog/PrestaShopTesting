import { Page, Locator } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

export class ClothesPage extends BaseCategoryPage {
    readonly topMenuLink: Locator;
    readonly menSubcategory: Locator;
    readonly womenSubcategory: Locator;

    constructor(page: Page) {
        super(page, 'Clothes');

        this.topMenuLink = this.frame.getByRole('link', {
            name: 'Clothes',
            exact: true,
        });

        this.menSubcategory = this.subcategoryByName('Men');
        this.womenSubcategory = this.subcategoryByName('Women');
    }

    async navigateFromTopMenu(): Promise<void> {
        await this.topMenuLink.click();
    }

    async openMenCategory(): Promise<void> {
        await this.menSubcategory.click();
    }

    async openWomenCategory(): Promise<void> {
        await this.womenSubcategory.click();
    }
}
