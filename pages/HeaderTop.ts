import { Page, Locator } from '@playwright/test';
import { TopMenuNavigation } from '../helpers/TopMenuNavigation';
import { GlobalConstants } from '../helpers/GlobalConstants'
export class TopMenu {
    readonly page: Page;
    readonly logo: Locator;
    readonly clothesButton: Locator;
    readonly accessoriesButton: Locator;
    readonly artButton: Locator;
    readonly searchInput: Locator

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator(GlobalConstants.iFramePath).contentFrame().getByRole('link', { name: 'PrestaShop', exact: true })
        this.clothesButton = page.locator(GlobalConstants.iFramePath).contentFrame().getByRole('link', { name: 'Clothes' })
        this.accessoriesButton = page
            .frameLocator(GlobalConstants.iFramePath)
            .locator('#_desktop_top_menu')
            .getByRole('link', { name: 'Accessories', exact: true });

        this.artButton = page.locator(GlobalConstants.iFramePath).contentFrame().getByRole('link', { name: 'Art' })
        this.searchInput = page.locator(GlobalConstants.iFramePath).contentFrame().getByRole('textbox', { name: 'Search' })
    }

    async clickMenuItem(item: TopMenuNavigation): Promise<void> {
        switch (item) {
            case TopMenuNavigation.Logo:
                await this.logo.click();
                break;
            case TopMenuNavigation.Clothes:
                await this.clothesButton.click();
                break;
            case TopMenuNavigation.Accessories:
                await this.accessoriesButton.click();
                break;
            case TopMenuNavigation.Art:
                await this.artButton.click();
                break;
            case TopMenuNavigation.Search:
                await this.searchInput.click();
                break;
            default:
                throw new Error(`Unsupported top menu item: ${item}`);
        }
    }

}
