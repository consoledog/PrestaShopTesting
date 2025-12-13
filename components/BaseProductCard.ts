import { Locator } from '@playwright/test';

export abstract class BaseProductCard {
    readonly root: Locator;

    protected constructor(root: Locator) {
        this.root = root;
    }
}
