import { expect, test } from '@playwright/test';

test('홈에 프랑스어·일본어·숫자 연습 카드가 보인다', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '언어 공부' })).toBeVisible();
    await expect(page.getByTestId('site-fr')).toHaveAttribute('href', 'https://ftf.byb.kr');
    await expect(page.getByTestId('site-ja')).toContainText('日本語');
    await expect(page.getByTestId('site-fr-numbers')).toHaveAttribute('href', '/french/numbers');
});

test('홈의 숫자 연습 카드를 누르면 숫자 연습 화면이 열린다', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('site-fr-numbers').click();
    await expect(page).toHaveURL(/\/french\/numbers$/);
    await expect(page).toHaveTitle('Les Nombres en français');
});
