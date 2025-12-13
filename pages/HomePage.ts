import { Page, Locator, FrameLocator } from '@playwright/test';
import { TopMenu } from './HeaderTop';
import { PopularProductsSection } from '../components/PopularProductsSection';
import { NewsLetterSection } from '../components/NewsLetterSection';
import { TopMenuNavigation } from '../helpers/TopMenuNavigation';
import { GlobalConstants } from '../helpers/GlobalConstants';
import { OnSaleSection } from 'components/OnSaleSection';

export class HomePage {
    readonly page: Page;
    readonly frame: FrameLocator;
    readonly url: string
    readonly topMenu: TopMenu
    readonly onSaleSection: OnSaleSection;
    readonly popularProductsSection: PopularProductsSection;
    readonly newsLetterSection: NewsLetterSection;
    readonly dicountLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.frame = page.frameLocator(GlobalConstants.iFramePath);
        this.url = `${GlobalConstants.baseUrl}/#/en/front`;
        this.topMenu = new TopMenu(page)
        this.onSaleSection = new OnSaleSection(page);
        this.popularProductsSection = new PopularProductsSection(page);
        this.newsLetterSection = new NewsLetterSection(page, this.frame);
        this.dicountLink = this.frame.locator("//img[@class='img-fluid']")
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

    async clickOnDiscountLink(): Promise<void> {
        await this.dicountLink.click();
    }

}
