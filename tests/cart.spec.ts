import { test, expect } from '@playwright/test';
import { Baseurl } from '../model/url';
import { users } from '../model/data';

test('pannier', async({page}) => {
    await page.goto(`${Baseurl}/home`);
    const elements = await page.locator('.style_card_body__QuFGN').all();
    if (elements.length === 0) {
        throw new Error('Aucun produit trouver');
    }
    const randomIndex = Math.floor(Math.random() * elements.length);
    await elements[randomIndex].click();
    await page.getByText('Ajouter au panier').click();
    await expect(page.locator("#style_content_cart_wrapper__mqNbf")).not.toBe('0');
})