import { describe, expect, it } from 'vitest';
import { isOpen } from './sites';

describe('isOpen', () => {
    const japanese = { opensOn: '2027-01-01' };

    it('여는 날이 없는 사이트는 언제나 열려 있다', () => {
        expect(isOpen({}, new Date('2000-01-01T00:00:00Z'))).toBe(true);
    });

    it('한국 시간으로 여는 날 0시 직전에는 닫혀 있다', () => {
        expect(isOpen(japanese, new Date('2026-12-31T23:59:59+09:00'))).toBe(false);
    });

    it('한국 시간으로 여는 날 0시부터 열린다(UTC로는 전날 15시)', () => {
        expect(isOpen(japanese, new Date('2026-12-31T15:00:00Z'))).toBe(true);
    });
});
