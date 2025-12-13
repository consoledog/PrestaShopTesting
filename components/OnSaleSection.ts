import { Locator, Page } from '@playwright/test';
import { OnSaleProductCard } from './OnSaleProductCard';
import { OnSaleProductData } from '../models/OnSaleProductData';
import { BaseProductSection } from './BaseProductSection';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class OnSaleSection extends BaseProductSection<OnSaleProductCard, OnSaleProductData> {
    constructor(page: Page) {
        const frame = page.frameLocator(GlobalConstants.iFramePath);
        const titleLocator: Locator = frame.locator('h2.h2.products-section-title.text-uppercase', {
            hasText: 'On sale',
        });

        const root: Locator = titleLocator.locator('xpath=ancestor::section[1]');
        const cardsLocator: Locator = root.locator('article.product-miniature');

        super(page, root, titleLocator, cardsLocator);
    }

    protected createCard(index: number): OnSaleProductCard {
        return new OnSaleProductCard(this.cardsLocator.nth(index));
    }

    protected getCardData(card: OnSaleProductCard): Promise<OnSaleProductData> {
        return card.getData();
    }
}
