import { Locator } from '@playwright/test';
import { OnSaleProductData } from '../models/OnSaleProductData';
import { BaseProductCard } from './BaseProductCard';

export class OnSaleProductCard extends BaseProductCard {

    readonly name: Locator;
    readonly originalPrice: Locator;
    readonly discountedPrice: Locator;
    readonly discountLabel: Locator;

    constructor(root: Locator) {
        super(root);

        this.name = root.locator('.product-title a');
        this.originalPrice = root.locator('.regular-price');
        this.discountedPrice = root.locator('.price');
        this.discountLabel = root.locator('.discount-product, .discount-percentage');
    }

    async getData(): Promise<OnSaleProductData> {
        const name = (await this.name.innerText()).trim();
        const originalPrice = (await this.originalPrice.innerText()).trim();
        const discountedPrice = (await this.discountedPrice.innerText()).trim();
        const discountLabel = (await this.discountLabel.innerText()).trim();

        return { name, originalPrice, discountedPrice, discountLabel };
    }
}
