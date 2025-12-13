import { FrameLocator, Locator, Page } from '@playwright/test';
import { GlobalConstants } from '../helpers/GlobalConstants';

export abstract class BaseProductSection<TCard, TData> {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly root: Locator;
    readonly cardsLocator: Locator;
    readonly titleLocator: Locator;

    protected constructor(page: Page, rootLocator: Locator, titleLocator: Locator, cardsLocator: Locator) {
        this.page = page;
        this.frame = page.frameLocator(GlobalConstants.iFramePath);
        this.root = rootLocator;
        this.titleLocator = titleLocator;
        this.cardsLocator = cardsLocator;
    }

    async getCardsCount(): Promise<number> {
        return this.cardsLocator.count();
    }

    protected abstract createCard(index: number): TCard;

    protected abstract getCardData(card: TCard): Promise<TData>;

    async getAllProductsData(): Promise<TData[]> {
        const count = await this.getCardsCount();
        const products: TData[] = [];

        for (let i = 0; i < count; i++) {
            const card = this.createCard(i);
            products.push(await this.getCardData(card));
        }

        return products;
    }
}
