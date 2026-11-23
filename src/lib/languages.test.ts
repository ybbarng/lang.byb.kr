import { describe, expect, it } from 'vitest';
import { stageAt } from './languages';

describe('stageAt', () => {
    const japanese = { stage: 'upcoming' as const, startsOn: '2027-01-01' };

    it('배우는 중인 말은 날짜와 상관없이 배우는 중이다', () => {
        expect(stageAt({ stage: 'learning' }, new Date('2000-01-01T00:00:00Z'))).toBe('learning');
    });

    it('언젠가 배울 말은 날짜와 상관없이 언젠가다', () => {
        expect(stageAt({ stage: 'someday' }, new Date('2030-01-01T00:00:00Z'))).toBe('someday');
    });

    it('곧 시작할 말은 한국 시간으로 여는 날 0시 직전까지 곧 시작이다', () => {
        expect(stageAt(japanese, new Date('2026-12-31T23:59:59+09:00'))).toBe('upcoming');
    });

    it('곧 시작할 말은 한국 시간으로 여는 날 0시부터 배우는 중이다(UTC로는 전날 15시)', () => {
        expect(stageAt(japanese, new Date('2026-12-31T15:00:00Z'))).toBe('learning');
    });
});
