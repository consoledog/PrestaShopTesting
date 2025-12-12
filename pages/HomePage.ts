import { Page, Locator } from '@playwright/test';
import { TopMenu } from './HeaderTop';
import { PopularProductsSection } from '../components/PopularProductsSection';
import { TopMenuNavigation } from '../helpers/TopMenuNavigation';
import { GlobalConstants } from '../helpers/GlobalConstants';

export class HomePage {
    readonly page: Page;
    readonly url: string
    readonly topMenu: TopMenu
    readonly popularProductsSection: PopularProductsSection;

    constructor(page: Page) {
        this.page = page;
        this.topMenu = new TopMenu(page)
        this.popularProductsSection = new PopularProductsSection(page);
        this.url = `${GlobalConstants.baseUrl}/#/en/front`;
    }

    async goToHomePage() {
        await this.page.goto(this.url)
    }

    async clickOnTheLogo() {
        await this.topMenu.clickMenuItem(TopMenuNavigation.Logo);
    }

    async clickOnClothes() {
        await this.topMenu.clickMenuItem(TopMenuNavigation.Clothes);
    }

    async clickOnAccessories() {
        await this.topMenu.clickMenuItem(TopMenuNavigation.Accessories);
    }

    async clickOnArt() {
        await this.topMenu.clickMenuItem(TopMenuNavigation.Art);
    }

    async search(keyword: string): Promise<void> {

        await this.topMenu.searchInput.fill(keyword);
        const productsList = this.page
            .frameLocator(GlobalConstants.iFramePath)
            .locator('#js-product-list');

        await Promise.all([
            this.topMenu.searchInput.press('Enter'),
            productsList.waitFor({ state: 'visible' }),
        ]);
    }

}
