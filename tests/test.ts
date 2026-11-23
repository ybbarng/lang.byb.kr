import { expect, test } from '@playwright/test';

test('홈에 배우는 말·곧 시작할 말·언젠가 배울 말이 보인다', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('세상의 말을, 하나씩 내 것으로');
    await expect(page.getByTestId('lang-fr-site')).toHaveAttribute('href', 'https://study-fr.byb.kr');
    // 일본어가 "곧 시작"인지 "배우는 중"인지는 날짜로 바뀐다. 그 판단은 단위 시험(languages.test.ts)이 본다
    await expect(page.getByTestId('lang-ja')).toContainText('日本語');
    await expect(page.getByTestId('lang-es')).toContainText('Español');
});

test('프랑스어 카드의 숫자 듣기 연습을 누르면 숫자 연습 화면이 열린다', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('tool-/french/numbers').click();
    await expect(page).toHaveURL(/\/french\/numbers$/);
    await expect(page).toHaveTitle('Les Nombres en français');
});
