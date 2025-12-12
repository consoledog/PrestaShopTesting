import { Locator } from "@playwright/test"
import { PopularProductData } from "../models/PopularProductData"

export class PopularProductCard {
    readonly root: Locator;

    readonly name: Locator;
    readonly currentPrice: Locator;
    readonly oldPrice: Locator;

    constructor(root: Locator) {
        this.root = root;

        this.name = root.locator('.product-title a');
        this.currentPrice = root.locator('.price');           // trenutna / snižena cena
        this.oldPrice = root.locator('.regular-price');       // "pre" cena, ako postoji
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