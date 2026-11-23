<script lang="ts">
    import { onMount } from 'svelte';
    import { LANGUAGES, stageAt, type Language, type Stage } from '$lib/languages';

    const TITLE = '세상의 말을, 하나씩 내 것으로';
    const NOTEBOOK = '나의 공부 노트';
    const SOMEDAY = '언젠가 배울 말';
    // 손글씨 글꼴은 손글씨로 쓰는 글자만 받아 온다(한글 글꼴 전체는 무겁다)
    const handFont = `https://fonts.googleapis.com/css2?family=Gaegu:wght@700&display=swap&text=${encodeURIComponent(
        TITLE + NOTEBOOK + SOMEDAY
    )}`;

    // 미리 그린 HTML은 빌드 시각 기준이다. 화면을 연 순간의 날짜로 다시 정한다
    let now = new Date();
    onMount(() => {
        now = new Date();
    });

    $: staged = LANGUAGES.map((language) => ({ ...language, current: stageAt(language, now) }));
    $: learning = staged.filter((l) => l.current === 'learning');
    $: upcoming = staged.filter((l) => l.current === 'upcoming');
    $: someday = staged.filter((l) => l.current === 'someday');

    const STAGE_LABEL: Record<Stage, string> = {
        learning: '배우는 중',
        upcoming: '곧 시작',
        someday: '언젠가'
    };

    const host = (url: string) => url.replace(/^https?:\/\//, '');
    const accent = (l: Language) => `--accent: ${l.accent}`;
</script>

<svelte:head>
    <title>lang.byb.kr · 나의 언어 공부</title>
    <meta name="description" content="세상의 말을, 하나씩 내 것으로. 언어 공부 사이트 모음" />
    <meta name="theme-color" content="#fbf8f1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href={handFont} />
</svelte:head>

<div class="paper min-h-screen">
    <div class="mx-auto max-w-5xl px-5 pb-16 pt-12 sm:px-12 sm:pt-20">
        <header>
            <p class="text-sm font-medium tracking-wide text-slate-500">lang.byb.kr · 나의 언어 공부</p>
            <h1 class="hand mt-2 text-4xl leading-tight text-slate-800 sm:text-6xl">
                <!-- 좁은 화면에서는 쉼표 뒤에서 줄을 바꾼다 -->
                {#each TITLE.split(', ') as part, i}
                    <span class="inline-block">{part}{i === 0 ? ',' : ''}</span>{i === 0 ? ' ' : ''}
                {/each}
            </h1>
            <p class="greetings mt-4 text-slate-500">
                {#each LANGUAGES as l}
                    <span lang={l.code} style={accent(l)}>{l.greeting}</span>
                {/each}
                <span>안녕하세요</span>
            </p>
            <ul class="mt-5 flex flex-wrap gap-2 text-sm" aria-label="단계별 언어 수">
                <li class="stat">배우는 중 <b>{learning.length}</b></li>
                <li class="stat">곧 시작 <b>{upcoming.length}</b></li>
                <li class="stat">언젠가 <b>{someday.length}</b></li>
            </ul>
        </header>

        <section class="mt-12" aria-labelledby="notebook">
            <h2 id="notebook" class="hand text-2xl text-slate-700 sm:text-3xl">{NOTEBOOK}</h2>
            <ul class="mt-4 grid gap-5 md:grid-cols-2">
                {#each learning as l (l.code)}
                    <li>
                        <article class="card" style={accent(l)} data-testid="lang-{l.code}">
                            <div class="band">
                                <span>{l.name}</span>
                                <span class="badge">{STAGE_LABEL.learning}</span>
                            </div>
                            <div class="body">
                                <p class="greeting" lang={l.code}>{l.greeting}</p>
                                <p class="desc">{l.korean}</p>
                                {#if l.url}
                                    <a class="go" href={l.url} data-testid="lang-{l.code}-site">
                                        <span>
                                            <span class="block font-semibold">공부하러 가기</span>
                                            <span class="block text-xs opacity-80">{host(l.url)}</span>
                                        </span>
                                        <span aria-hidden="true" class="text-xl">→</span>
                                    </a>
                                {/if}
                                {#if l.tools?.length}
                                    <ul class="tools">
                                        {#each l.tools as tool}
                                            <li>
                                                <a href={tool.url} data-testid="tool-{tool.url}">
                                                    {tool.label}
                                                    <span aria-hidden="true">→</span>
                                                </a>
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            </div>
                        </article>
                    </li>
                {/each}
                {#each upcoming as l (l.code)}
                    <li>
                        <article class="card waiting" style={accent(l)} data-testid="lang-{l.code}">
                            <div class="band">
                                <span>{l.name}</span>
                                <span class="badge">{STAGE_LABEL.upcoming}</span>
                            </div>
                            <div class="body">
                                <p class="greeting" lang={l.code}>{l.greeting}</p>
                                <p class="desc">{l.korean}</p>
                                <p class="mt-auto pt-6 text-sm text-slate-500">노트를 준비하고 있어요</p>
                            </div>
                            <span class="stamp">{l.startsOn} 시작</span>
                        </article>
                    </li>
                {/each}
            </ul>
        </section>

        <section class="mt-14" aria-labelledby="someday">
            <h2 id="someday" class="hand text-2xl text-slate-700 sm:text-3xl">{SOMEDAY}</h2>
            <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {#each someday as l (l.code)}
                    <li class="slot" style={accent(l)} data-testid="lang-{l.code}">
                        <span class="slot-greeting" lang={l.code}>{l.greeting}</span>
                        <span class="text-sm font-semibold text-slate-600" lang={l.code}>{l.name}</span>
                        <span class="text-xs text-slate-400">{l.korean}</span>
                    </li>
                {/each}
                <li class="slot more" aria-label="다음 언어">
                    <span class="slot-greeting">+</span>
                    <span class="text-sm font-semibold text-slate-500">그리고 또…</span>
                    <span class="text-xs text-slate-400">다음 말은 무엇일까</span>
                </li>
            </ul>
        </section>
    </div>
</div>

<style>
    /* 줄 공책: 옅은 파란 가로줄 + 넓은 화면에서는 왼쪽 빨간 여백선 */
    .paper {
        --line: repeating-linear-gradient(to bottom, transparent 0 31px, rgb(70 110 180 / 0.13) 31px 32px);
        background-color: #fbf8f1;
        background-image: var(--line);
    }
    @media (min-width: 640px) {
        .paper {
            background-image: linear-gradient(
                    90deg,
                    transparent 0 2rem,
                    rgb(210 70 70 / 0.3) 2rem calc(2rem + 2px),
                    transparent calc(2rem + 2px)
                ),
                var(--line);
        }
    }

    .hand {
        font-family: 'Gaegu', ui-rounded, system-ui, sans-serif;
        font-weight: 700;
        /* 한글이 글자 중간에서 끊기지 않게 낱말 단위로 줄을 바꾼다 */
        word-break: keep-all;
    }

    .greetings {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 0.9rem;
        font-family: ui-serif, Georgia, 'Hiragino Mincho ProN', serif;
        font-size: 1.05rem;
    }
    .greetings span[lang] {
        color: var(--accent);
    }

    .stat {
        border: 1.5px solid rgb(100 116 139 / 0.3);
        border-radius: 999px;
        padding: 0.2rem 0.75rem;
        background: rgb(255 255 255 / 0.7);
        color: #475569;
    }
    .stat b {
        margin-left: 0.25rem;
        color: #0f172a;
    }

    /* 공부 노트 카드 */
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
    }
    .band {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--accent);
        color: #fff;
        padding: 0.5rem 1.25rem;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.04em;
    }
    .badge {
        border-radius: 999px;
        background: rgb(255 255 255 / 0.22);
        padding: 0.05rem 0.6rem;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0;
    }
    .body {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 1.25rem;
        background-image: repeating-linear-gradient(
            to bottom,
            transparent 0 27px,
            rgb(70 110 180 / 0.08) 27px 28px
        );
        background-position: 0 1.1rem;
    }
    .greeting {
        font-family: ui-serif, Georgia, 'Hiragino Mincho ProN', serif;
        font-size: 2.25rem;
        line-height: 1.2;
        color: var(--accent);
    }
    .desc {
        margin-top: 0.25rem;
        color: #475569;
    }

    /* 공부 사이트로 가는 큰 단추: 폰에서 엄지로 누르기 쉽게 48px 넘게 */
    .go {
        margin-top: 1.25rem;
        display: flex;
        min-height: 3.25rem;
        align-items: center;
        justify-content: space-between;
        border-radius: 0.6rem;
        background: var(--accent);
        color: #fff;
        padding: 0.6rem 1rem;
        text-decoration: none;
        transition: filter 0.15s ease, transform 0.15s ease;
    }
    .go:hover {
        filter: brightness(1.08);
        transform: translateY(-1px);
    }
    .go:active {
        transform: translateY(0);
    }
    .tools {
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .tools a {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.4rem;
        border: 1.5px solid color-mix(in srgb, var(--accent) 35%, transparent);
        border-radius: 0.6rem;
        padding: 0 0.9rem;
        color: var(--accent);
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        background: #fff;
    }
    .tools a:hover {
        background: color-mix(in srgb, var(--accent) 8%, #fff);
    }
    .go:focus-visible,
    .tools a:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 3px;
    }

    /* 곧 시작: 흐린 점선 카드 + 도장 */
    .waiting {
        background: rgb(255 255 255 / 0.65);
        box-shadow: none;
        border: 1.5px dashed rgb(100 116 139 / 0.35);
    }
    .waiting .band {
        opacity: 0.6;
    }
    .waiting .greeting {
        opacity: 0.6;
    }
    .stamp {
        position: absolute;
        right: 1.1rem;
        bottom: 1.1rem;
        transform: rotate(-8deg);
        border: 2px solid var(--accent);
        border-radius: 0.4rem;
        padding: 0.25rem 0.6rem;
        color: var(--accent);
        font-size: 0.85rem;
        font-weight: 700;
        background: rgb(255 255 255 / 0.85);
    }

    /* 언젠가: 빈 칸 */
    .slot {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        border: 1.5px dashed color-mix(in srgb, var(--accent, #64748b) 45%, transparent);
        border-radius: 0.75rem;
        background: rgb(255 255 255 / 0.5);
        padding: 0.9rem 1rem;
    }
    .slot-greeting {
        font-family: ui-serif, Georgia, 'Hiragino Mincho ProN', serif;
        font-size: 1.4rem;
        line-height: 1.3;
        color: color-mix(in srgb, var(--accent, #64748b) 70%, #fff);
    }
    .more {
        --accent: #94a3b8;
    }

    @media (prefers-reduced-motion: reduce) {
        .go {
            transition: none;
        }
        .go:hover {
            transform: none;
        }
    }
</style>
