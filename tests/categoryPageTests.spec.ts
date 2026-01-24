import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { ClothesPage } from '../pages/ClotesPage';
import { ArtPage } from '../pages/ArtPage';
import { SortOption } from 'helpers/SortOption';
import { ProductData } from 'models/ProductData';

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

test('TC-CAT-01 – Verify sort dropdown', async () => {
    await test.step('Sort accessories by Price, low to high', async () => {
        await homePage.clickOnAccessories();
        await accessoriesPage.sortBy(SortOption.PRICE_LOW_TO_HIGH);
        await expect(accessoriesPage.sortDropdown).toContainText(SortOption.PRICE_LOW_TO_HIGH);
    });

    await test.step('Check that the sort is in correct order', async () => {
        const products: ProductData[] = await accessoriesPage.getAllProducts();
        const pricesBeforeSort = products.map(p => Number(p.currentPrice));
        const sortedProducts = [...products].sort((a, b) => Number(a.currentPrice) - Number(b.currentPrice));
        const pricesAfterSort = sortedProducts.map(p => Number(p.currentPrice));

        // Compare two sorted arrays
        expect(pricesAfterSort).toEqual(pricesBeforeSort.sort((a, b) => a - b));
    });
});

test.skip('TC-CAT-02 – Verify filter by Size', async () => {
    await test.step('Filter clothes by size S (2)', async () => {
        await homePage.clickOnClothes();
        await clothesPage.toggleFilterOption('Size', 'S (2)');
    });

    await test.step('Verify number of products in S Size filter', async () => {
        const sizeOptions = clothesPage.getFilterOptionsBySectionName('Size');
        const sOption = sizeOptions.filter({ hasText: 'S (2)' }).first();
        const labelText = await sOption.innerText();

        const match = labelText.match(/\((\d+)\)/);
        const expectedCount = match ? Number(match[1]) : 0;

        const products: ProductData[] = await clothesPage.getAllProducts();
        expect(products.length).toBe(expectedCount);
    });
});