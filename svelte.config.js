import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // 서버 코드 없이 모든 화면을 빌드 때 미리 그려 build/ 에 정적 파일로 낸다.
        // 정적 파일 서버(byb.kr 정적 컨테이너 등)든 Vercel이든 그대로 올릴 수 있다
        adapter: adapter()
    }
};

export default config;
