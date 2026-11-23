/**
 * 홈(/)에서 들어가는 언어별 학습 사이트 목록.
 * 주소는 여기에만 둔다. 사이트 주소가 바뀌면(예: 프랑스어 ftf → study-fr) 이 파일의 `url`만 고친다.
 */
export type Site = {
    id: string;
    /** 카드 제목(그 언어로) */
    title: string;
    /** 카드 아래 한국어 설명 */
    description: string;
    url: string;
    /** 바깥 사이트면 true(새 탭으로 열지 않고, 주소 표시만 다르게) */
    external: boolean;
    /** 아직 열리지 않은 사이트면 여는 날(한국 시간 YYYY-MM-DD). 그 전에는 링크 대신 "○○ 시작"을 보인다 */
    opensOn?: string;
};

export const SITES: Site[] = [
    {
        id: 'fr',
        title: 'Français',
        description: '프랑스어 공부',
        url: 'https://ftf.byb.kr',
        external: true
    },
    {
        id: 'ja',
        title: '日本語',
        description: '일본어 공부',
        url: 'https://study-ja.byb.kr',
        external: true,
        opensOn: '2027-01-01'
    },
    {
        id: 'fr-numbers',
        title: 'Les Nombres',
        description: '프랑스어 숫자 듣기 연습',
        url: '/french/numbers',
        external: false
    }
];

/** 여는 날이 없거나, 한국 시간으로 여는 날 0시가 지났으면 열린 사이트다 */
export function isOpen(site: Pick<Site, 'opensOn'>, now: Date): boolean {
    if (!site.opensOn) return true;
    return now.getTime() >= new Date(`${site.opensOn}T00:00:00+09:00`).getTime();
}
