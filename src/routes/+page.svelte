<script lang="ts">
    import { onMount } from 'svelte';
    import { SITES, isOpen } from '$lib/sites';

    const TITLE = '오늘은 무슨 말을 공부할까?';
    // 손글씨 글꼴은 제목 글자만 받아 온다(한글 글꼴 전체는 무겁다)
    const titleFont = `https://fonts.googleapis.com/css2?family=Gaegu:wght@700&display=swap&text=${encodeURIComponent(TITLE)}`;

    // 미리 그린 HTML은 빌드 시각 기준이다. 화면을 연 순간의 날짜로 다시 정한다
    let now = new Date();
    onMount(() => {
        now = new Date();
    });

    const host = (url: string) => url.replace(/^https?:\/\//, '');
</script>

<svelte:head>
    <title>lang.byb.kr · 언어 공부</title>
    <meta name="description" content="언어 공부 사이트 모음" />
    <meta name="theme-color" content="#fbf8f1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href={titleFont} />
</svelte:head>

<div class="paper min-h-screen">
    <div class="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:px-12 sm:pt-20">
        <header>
            <p class="text-sm font-medium tracking-wide text-slate-500">lang.byb.kr</p>
            <h1 class="title mt-2 text-4xl leading-tight text-slate-800 sm:text-5xl">{TITLE}</h1>
            <p class="mt-3 text-slate-500">
                <span lang="fr">Bonjour</span> · <span lang="ja">こんにちは</span> · 안녕하세요
            </p>
        </header>

        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {#each SITES as site (site.id)}
                {@const open = isOpen(site, now)}
                <li>
                    {#if open}
                        <a href={site.url} data-testid="site-{site.id}" class="card" style="--accent: {site.accent}">
                            <span class="band">{site.title}</span>
                            <span class="body">
                                <span class="greeting" lang={site.id === 'ja' ? 'ja' : 'fr'}>{site.greeting}</span>
                                <span class="desc">{site.description}</span>
                                <span class="foot">
                                    <span>{site.external ? host(site.url) : '바로 연습하기'}</span>
                                    <span aria-hidden="true" class="arrow">→</span>
                                </span>
                            </span>
                        </a>
                    {:else}
                        <div
                            data-testid="site-{site.id}"
                            aria-disabled="true"
                            class="card locked"
                            style="--accent: {site.accent}"
                        >
                            <span class="band">{site.title}</span>
                            <span class="body">
                                <span class="greeting" lang="ja">{site.greeting}</span>
                                <span class="desc">{site.description}</span>
                                <span class="foot"><span>곧 열려요</span></span>
                            </span>
                            <span class="stamp">{site.opensOn} 시작</span>
                        </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    /* 줄 공책: 옅은 파란 가로줄 + 데스크탑에서는 왼쪽 빨간 여백선 */
    .paper {
        background-color: #fbf8f1;
        background-image: repeating-linear-gradient(
            to bottom,
            transparent 0 31px,
            rgb(70 110 180 / 0.13) 31px 32px
        );
    }
    @media (min-width: 640px) {
        .paper {
            background-image: linear-gradient(
                    90deg,
                    transparent 0 2rem,
                    rgb(210 70 70 / 0.3) 2rem calc(2rem + 2px),
                    transparent calc(2rem + 2px)
                ),
                repeating-linear-gradient(to bottom, transparent 0 31px, rgb(70 110 180 / 0.13) 31px 32px);
        }
    }

    .title {
        font-family: 'Gaegu', ui-rounded, system-ui, sans-serif;
        font-weight: 700;
        /* 한글 제목이 글자 중간에서 끊기지 않게 낱말 단위로 줄을 바꾼다 */
        word-break: keep-all;
    }

    /* 단어 카드 */
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        border-radius: 0.75rem;
        background: #fff;
        box-shadow: 0 1px 2px rgb(30 40 60 / 0.08), 0 4px 14px rgb(30 40 60 / 0.06);
        color: #1e293b;
        text-decoration: none;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    a.card:hover {
        transform: translateY(-3px) rotate(-0.4deg);
        box-shadow: 0 2px 4px rgb(30 40 60 / 0.08), 0 10px 24px rgb(30 40 60 / 0.1);
    }
    a.card:active {
        transform: translateY(0);
    }
    a.card:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 3px;
    }

    .band {
        background: var(--accent);
        color: #fff;
        padding: 0.45rem 1.25rem;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.04em;
    }
    .body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.35rem;
        padding: 1.25rem 1.25rem 1rem;
        /* 카드 안 옅은 줄 */
        background-image: repeating-linear-gradient(
            to bottom,
            transparent 0 27px,
            rgb(70 110 180 / 0.08) 27px 28px
        );
        background-position: 0 1.1rem;
    }
    .greeting {
        font-family: ui-serif, Georgia, 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
        font-size: 1.75rem;
        line-height: 1.25;
        color: var(--accent);
    }
    .desc {
        color: #475569;
    }
    .foot {
        margin-top: auto;
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        color: #94a3b8;
    }
    .arrow {
        font-size: 1.25rem;
        color: var(--accent);
        transition: transform 0.15s ease;
    }
    a.card:hover .arrow {
        transform: translateX(4px);
    }

    /* 아직 열리지 않은 카드: 흐리게 + 도장 */
    .locked {
        background: rgb(255 255 255 / 0.65);
        box-shadow: none;
        border: 1.5px dashed rgb(100 116 139 / 0.35);
    }
    .locked .band {
        opacity: 0.55;
    }
    .locked .greeting {
        opacity: 0.55;
    }
    .stamp {
        position: absolute;
        right: 1rem;
        bottom: 1.1rem;
        transform: rotate(-8deg);
        border: 2px solid var(--accent);
        border-radius: 0.4rem;
        padding: 0.2rem 0.55rem;
        color: var(--accent);
        font-size: 0.8rem;
        font-weight: 700;
        background: rgb(255 255 255 / 0.85);
    }

    @media (prefers-reduced-motion: reduce) {
        .card,
        .arrow {
            transition: none;
        }
        a.card:hover {
            transform: none;
        }
        a.card:hover .arrow {
            transform: none;
        }
    }
</style>
