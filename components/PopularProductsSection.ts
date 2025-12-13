import { Locator, Page } from '@playwright/test';
import { PopularProductCard } from './PopularProductCard';
import { PopularProductData } from '../models/PopularProductData';
import { BaseProductSection } from './BaseProductSection';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class PopularProductsSection extends BaseProductSection<PopularProductCard, PopularProductData> {
    constructor(page: Page) {
        const frame = page.frameLocator(GlobalConstants.iFramePath);
        const root: Locator = frame.locator("//section[@class='featured-products clearfix']");
        const titleLocator: Locator = root.getByRole('heading', {
            name: 'Popular Products',
            exact: true,
        });
        const cardsLocator: Locator = root.locator('article.product-miniature');

        super(page, root, titleLocator, cardsLocator);
    }

    protected createCard(index: number): PopularProductCard {
        return new PopularProductCard(this.cardsLocator.nth(index));
    }

    protected getCardData(card: PopularProductCard): Promise<PopularProductData> {
        return card.getData();
    }
}