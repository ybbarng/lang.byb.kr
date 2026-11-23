<script lang="ts">
    import { onMount } from 'svelte';
    import { SITES, isOpen } from '$lib/sites';

    // 미리 그린 HTML은 빌드 시각 기준이다. 화면을 연 순간의 날짜로 다시 정한다
    let now = new Date();
    onMount(() => {
        now = new Date();
    });

    const host = (url: string) => url.replace(/^https?:\/\//, '');
</script>

<svelte:head>
    <title>lang.byb.kr</title>
    <meta name="description" content="언어 공부 사이트 모음" />
</svelte:head>

<section class="mx-auto max-w-md px-4 py-10">
    <h1 class="text-2xl font-bold text-gray-900">언어 공부</h1>
    <p class="mt-1 text-sm text-gray-600">lang.byb.kr</p>

    <ul class="mt-6 space-y-3">
        {#each SITES as site (site.id)}
            {@const open = isOpen(site, now)}
            <li>
                {#if open}
                    <a
                        href={site.url}
                        data-testid="site-{site.id}"
                        class="flex min-h-[4.5rem] items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm active:bg-gray-50"
                    >
                        <span>
                            <span class="block text-lg font-semibold text-gray-900">{site.title}</span>
                            <span class="block text-sm text-gray-600">{site.description}</span>
                            {#if site.external}
                                <span class="block text-xs text-gray-400">{host(site.url)}</span>
                            {/if}
                        </span>
                        <span aria-hidden="true" class="text-2xl text-gray-400">›</span>
                    </a>
                {:else}
                    <div
                        data-testid="site-{site.id}"
                        aria-disabled="true"
                        class="flex min-h-[4.5rem] items-center justify-between rounded-2xl bg-white/60 px-5 py-4"
                    >
                        <span>
                            <span class="block text-lg font-semibold text-gray-500">{site.title}</span>
                            <span class="block text-sm text-gray-500">{site.description}</span>
                        </span>
                        <span class="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                            {site.opensOn} 시작
                        </span>
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</section>
