import { Locator } from "@playwright/test"
import { PopularProductData } from "../models/PopularProductData"
import { BaseProductCard } from './BaseProductCard';

export class PopularProductCard extends BaseProductCard {

    readonly name: Locator;
    readonly currentPrice: Locator;
    readonly oldPrice: Locator;

    constructor(root: Locator) {
        super(root);

        this.name = root.locator('.product-title a');
        this.currentPrice = root.locator('.price');
        this.oldPrice = root.locator('.regular-price');
    }

    async getData(): Promise<PopularProductData> {
        const name: string = (await this.name.innerText()).trim();
        const currentPrice = (await this.currentPrice.innerText()).trim();
        let oldPrice: string | undefined;
        if (await this.oldPrice.count()) {
            oldPrice = (await this.oldPrice.innerText()).trim();
        }
        return { name, currentPrice, oldPrice };
    }
}