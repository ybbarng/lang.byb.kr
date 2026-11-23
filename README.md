# lang.byb.kr

나의 언어 공부 홈. 언어별 공부 사이트(study-fr.byb.kr, study-ja.byb.kr 등)로 들어가는 가벼운 링크 모음과,
작은 연습 도구(프랑스어 숫자 듣기 `/french/numbers`)가 있다. 교재 자료는 각 공부 사이트에 두고 여기에는 두지 않는다.

## 언어 더하기·주소 바꾸기

`src/lib/languages.ts` 한 파일만 고친다.

- 배우는 중(`learning`): 공부 사이트 `url`과 도구 `tools`를 적는다.
- 곧 시작(`upcoming`): `startsOn`(한국 시간)을 적으면 그날 0시부터 저절로 배우는 중으로 보인다.
- 언젠가(`someday`): 이름과 인사말만 적는다. 링크는 없다.

## 개발

```bash
npm ci
npm run dev
npm run test:unit -- --run   # 단위 시험
npm run test:integration     # 통합 시험(빌드 → 미리보기 → 시스템 Chrome)
```

## 배포

SvelteKit `adapter-static`으로 모든 화면을 `build/`에 정적 파일로 낸다. main에 push하면 GitHub Actions(`.github/workflows/image.yml`)가
nginx 이미지(`ghcr.io/ybbarng/lang.byb.kr`)를 만들어 올리고, byb.kr 서버의 `servers` 저장소 `byb.kr/apps/lang/deploy.sh`로 배포한다.
2026-11 Vercel에서 옮겼다.
