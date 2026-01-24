import { Page, Locator, FrameLocator } from '@playwright/test';
import { SortOption } from '../helpers/SortOption';
import { GlobalConstants } from '../helpers/GlobalConstants';
import { ProductData } from '../models/ProductData';

export abstract class BaseCategoryPage {
    readonly page: Page;
    readonly frame: FrameLocator;

    // Common elements (header / content)
    readonly title: Locator;
    readonly description: Locator;
    readonly categoryCoverImage: Locator;

    // Left column
    readonly leftCategoriesBlock: Locator;
    readonly leftCategoryLinks: Locator;

    readonly brandsBlock: Locator;
    readonly brandsLinks: Locator;

    readonly suppliersBlock: Locator;
    readonly suppliersLinks: Locator;

    // Filters
    readonly filtersWrapper: Locator;
    readonly filterSections: Locator;

    // Subcategories (middle)
    readonly subcategoriesSection: Locator;
    readonly subcategoriesList: Locator;
    readonly subcategoryItems: Locator;

    // Products
    readonly productsSection: Locator;
    readonly productsHeader: Locator;
    readonly sortDropdown: Locator;
    readonly productCards: Locator;
    readonly totalProductsLabel: Locator;

    // Optional meta
    readonly categoryName: string;

    constructor(page: Page, categoryName: string) {
        this.page = page;
        this.categoryName = categoryName;

        //The whole shop is in this frame
        this.frame = page.frameLocator(GlobalConstants.iFramePath);

        this.title = this.frame.locator('.block-category h1.h1');
        this.description = this.frame.locator('#category-description');
        this.categoryCoverImage = this.frame.locator('.block-category .category-cover img');

        // ====== left part of the page ======
        this.leftCategoriesBlock = this.frame.locator('.block-categories');
        this.leftCategoryLinks = this.leftCategoriesBlock.locator('.category-sub-menu a');

        // Brands
        this.brandsBlock = this.frame.locator('#search_filters_brands');
        this.brandsLinks = this.brandsBlock.locator('.facet ul li a');

        // Suppliers
        this.suppliersBlock = this.frame.locator('#search_filters_suppliers');
        this.suppliersLinks = this.suppliersBlock.locator('.facet ul li a');

        // Filter wrapper (Color, Composition, Property...)
        this.filtersWrapper = this.frame.locator('#search_filters_wrapper');
        this.filterSections = this.filtersWrapper.locator('#search_filters section.facet');

        // ====== SUBCATEGORIES ======
        this.subcategoriesSection = this.frame.locator('#subcategories');
        this.subcategoriesList = this.subcategoriesSection.locator('.subcategories-list');
        this.subcategoryItems = this.subcategoriesList.locator('li');

        // ====== PRODUCTS LIST ======
        this.productsSection = this.frame.locator('section#products');
        this.productsHeader = this.productsSection.locator('#js-product-list-top');
        this.sortDropdown = this.productsHeader.locator('.products-sort-order button.select-title');
        this.productCards = this.productsSection.locator('#js-product-list article.product-miniature');

        // "There are 11 products."
        this.totalProductsLabel = this.productsHeader.locator('.total-products p');
    }

    subcategoryByName(name: string): Locator {
        return this.subcategoriesSection.getByRole('link', { name, exact: true });
    }

    leftCategoryByName(name: string): Locator {
        return this.leftCategoryLinks.filter({ hasText: name });
    }

    brandByName(name: string): Locator {
        return this.brandsLinks.filter({ hasText: name });
    }

    supplierByName(name: string): Locator {
        return this.suppliersLinks.filter({ hasText: name });
    }

    productByName(name: string): Locator {
        return this.productCards.locator('.product-title a').filter({ hasText: name }).first();
    }

    async openSubCategory(name: string): Promise<void> {
        await this.subcategoryByName(name).click();
    }

    async openLeftCategory(name: string): Promise<void> {
        await this.leftCategoryByName(name).click();
    }

    async openProduct(name: string): Promise<void> {
        await this.productByName(name).click();
    }

    async sortBy(option: SortOption): Promise<void> {
        await this.sortDropdown.click();
        await this.productsHeader
            .locator('.dropdown-menu .select-list')
            .filter({ hasText: option })
            .click();
    }

    async getAllProducts(): Promise<ProductData[]> {
        const productsCount = await this.productCards.count();
        const products: ProductData[] = [];

        for (let index = 0; index < productsCount; index++) {
            const card = this.productCards.nth(index);

            const name = await card.locator('.product-title a').innerText();
            const currentPrice = await card.locator('.price').first().innerText();

            products.push({
                name,
                currentPrice
            });
        }

        return products;
    }

    getFilterOptionsBySectionName(sectionName: string): Locator {
        const section = this.filterSections.filter({ hasText: sectionName }).first();
        return section.locator('label');
    }

    async toggleFilterOption(sectionName: string, optionText: string): Promise<void> {
        const options = this.getFilterOptionsBySectionName(sectionName);
        const option = options.filter({ hasText: optionText }).first();
        await option.click();
    }


}
