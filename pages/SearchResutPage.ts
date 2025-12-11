import { Page, Locator } from '@playwright/test';
import { BaseCategoryPage } from './BaseCategoryPage';

export class SearchResultsPage extends BaseCategoryPage {
    readonly totalProductsLabel: Locator;
    readonly productDoesNotExistLabel: Locator;

    constructor(page: Page) {
        super(page, 'SearchResults');

        this.totalProductsLabel = this.frame.locator('#js-product-list-top .total-products p');
        this.productDoesNotExistLabel = this.frame.locator('#product-search-no-matches');
    }

    async getTotalProductsFromLabel(): Promise<number> {
        const text = (await this.totalProductsLabel.textContent()) ?? '';
        const match = text.match(/(\d+)/);
        return match ? Number(match[1]) : 0;
    }

    async getNumberOfProductCards(): Promise<number> {
        return this.productCards.count();
    }
}
