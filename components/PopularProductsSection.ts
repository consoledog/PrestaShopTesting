import { Page, FrameLocator, Locator } from '@playwright/test';
import { PopularProductCard } from './PopularProductCard';
import { PopularProductData } from '../models/PopularProductData';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class PopularProductsSection {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly root: Locator;
    readonly cardsLocator: Locator;
    readonly titleLocator: Locator

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator(GlobalConstants.iFramePath);
        this.root = this.frame.locator("//section[@class='featured-products clearfix']")
        this.titleLocator = this.root.getByRole('heading', {
            name: 'Popular Products',
            exact: true,
        });
        this.cardsLocator = this.root.locator('article.product-miniature');
    }

    async getCardsCount(): Promise<number> {
        return await this.cardsLocator.count();
    }

    getCard(index: number): PopularProductCard {
        return new PopularProductCard(this.cardsLocator.nth(index));
    }

    async getAllProductsData(): Promise<PopularProductData[]> {
        const count = await this.getCardsCount();
        const productsData: PopularProductData[] = []

        for (let index = 0; index < count; index++) {
            const card = this.getCard(index);
            productsData.push(await card.getData());
        }

        return productsData;
    }
}