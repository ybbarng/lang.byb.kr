/**
 * 홈(/)에 보이는 언어 목록. 언어를 더하거나 주소를 바꿀 때는 이 파일만 고친다.
 *
 * 단계
 * - learning: 배우는 중. 공부 사이트(`url`)와 도구(`tools`) 링크를 보인다.
 * - upcoming: 곧 시작. `startsOn`(한국 시간 YYYY-MM-DD) 0시가 지나면 저절로 learning으로 보인다.
 * - someday: 언젠가 배우고 싶은 말. 링크 없이 빈 카드로 둔다. 시작하면 upcoming이나 learning으로 옮긴다.
 */
export type Stage = 'learning' | 'upcoming' | 'someday';

export type Tool = { label: string; url: string };

export type Language = {
    /** BCP 47 언어 코드. 화면의 lang 속성과 data-testid에 쓴다 */
    code: string;
    /** 그 언어로 쓴 이름 */
    name: string;
    /** 한국어 이름 */
    korean: string;
    /** 카드에 크게 쓰는 그 언어 인사말 */
    greeting: string;
    /** 카드 띠 색(CSS 색) */
    accent: string;
    stage: Stage;
    /** upcoming일 때 여는 날 */
    startsOn?: string;
    /** 공부 사이트 주소 */
    url?: string;
    /** 이 저장소 안의 작은 연습 도구 */
    tools?: Tool[];
};

export const LANGUAGES: Language[] = [
    {
        code: 'fr',
        name: 'Français',
        korean: '프랑스어',
        greeting: 'Bonjour !',
        accent: '#2b59c3',
        stage: 'learning',
        url: 'https://study-fr.byb.kr',
        tools: [{ label: '숫자 듣기 연습', url: '/french/numbers' }]
    },
    {
        code: 'ja',
        name: '日本語',
        korean: '일본어',
        greeting: 'こんにちは',
        accent: '#c8323c',
        stage: 'upcoming',
        startsOn: '2027-01-01',
        url: 'https://study-ja.byb.kr'
    },
    { code: 'es', name: 'Español', korean: '스페인어', greeting: '¡Hola!', accent: '#d9902f', stage: 'someday' },
    { code: 'it', name: 'Italiano', korean: '이탈리아어', greeting: 'Ciao!', accent: '#2f8f5b', stage: 'someday' },
    { code: 'de', name: 'Deutsch', korean: '독일어', greeting: 'Hallo!', accent: '#3d3d3d', stage: 'someday' },
    { code: 'zh', name: '中文', korean: '중국어', greeting: '你好', accent: '#b8322a', stage: 'someday' }
];

/** 지금 보여 줄 단계. upcoming은 한국 시간으로 여는 날 0시부터 learning이다 */
export function stageAt(language: Pick<Language, 'stage' | 'startsOn'>, now: Date): Stage {
    if (language.stage !== 'upcoming' || !language.startsOn) return language.stage;
    const opens = new Date(`${language.startsOn}T00:00:00+09:00`).getTime();
    return now.getTime() >= opens ? 'learning' : 'upcoming';
}
