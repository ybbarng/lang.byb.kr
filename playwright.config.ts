import type { PlaywrightTestConfig } from '@playwright/test';
import { BROWSER } from './tests/browser';

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run build && npm run preview',
        port: 4173
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    // 뜨는 브라우저가 보안 수정 뒤 버전인지 먼저 본다(tests/browser.ts)
    globalSetup: './tests/global-setup.ts',
    // 번들 Chromium 대신 패치된 시스템 Chrome을 샌드박스를 켜서 띄운다
    use: { ...BROWSER }
};

export default config;
