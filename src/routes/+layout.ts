import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

// 모든 화면을 빌드 때 미리 그린다(adapter-static)
export const prerender = true;

inject({ mode: dev ? 'development' : 'production' });
