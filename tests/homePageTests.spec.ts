import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { ClothesPage } from '../pages/ClotesPage';
import { ArtPage } from '../pages/ArtPage';
import { SearchResultsPage } from '../pages/SearchResutPage';
import testData from '../data_inputs/home_page_tests/tc_hp_02.json';

let homePage: HomePage;
let accessoriesPage: AccessoriesPage;
let clothesPage: ClothesPage;
let artPage: ArtPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    accessoriesPage = new AccessoriesPage(page);
    clothesPage = new ClothesPage(page);
    artPage = new ArtPage(page);

    await test.step('Go to the website', async () => {
        await homePage.goToHomePage();
        await expect(homePage.topMenu.logo).toBeVisible({ timeout: 30000 });
    });
});

test('TC-HP-01 – Verify main navigation and logo', async () => {
    await test.step("Click on the logo 'mystore'", async () => {
        await homePage.clickOnTheLogo();
        await expect(homePage.popularProductsPage.heading).toBeVisible();
    });

    await test.step('Click on the clothes', async () => {
        await homePage.clickOnClothes();
        await expect(clothesPage.title).toHaveText(clothesPage.categoryName);
    });

    await test.step('Click on accessories', async () => {
        await homePage.clickOnAccessories();
        await expect(accessoriesPage.title).toHaveText(accessoriesPage.categoryName);
    });

    await test.step('Click on art', async () => {
        await homePage.clickOnArt();
        await expect(artPage.title).toHaveText(artPage.categoryName);
    });
});

for (const { name, keywordToSearch, expectedNumberOfProducts } of testData) {
    test(`TC-HP-02 – Verify search field is displayed and usable – ${name}`, async ({ page }) => {
        await test.step(`Search the term ${keywordToSearch}`, async () => {
            await homePage.search(keywordToSearch);
        });

        const searchResultsPage = new SearchResultsPage(page);

        await test.step('Verify search results are shown and count matches', async () => {

            if (expectedNumberOfProducts > 0) {
                const totalFromLabel = await searchResultsPage.getTotalProductsFromLabel();
                const cardsCount = await searchResultsPage.getNumberOfProductCards();

                expect(totalFromLabel).toBe(cardsCount);
                expect(cardsCount).toBe(expectedNumberOfProducts);
            }
            else {
                await expect(searchResultsPage.productDoesNotExistLabel).toBeVisible();
            }

        });
    });
}
