# HANDOFF — lang.byb.kr

마지막 갱신: 2026-11-23

## 지금 상태 한 줄

https://lang.byb.kr 은 byb.kr 서버(nginx 컨테이너, Traefik 뒤)에서 새 홈을 내준다. main push → GitHub Actions(Image)가
이미지를 만들어 servers 저장소 `byb.kr/apps/lang/deploy.sh`로 배포한다. Gatus 감시와 servers `sites.md`·`dns.md`도 반영됐다.

## 끝난 일

- 비서 요청 `R-20261123-1127-8i`(언어 공부 홈)와 후속 `R-20261123-1137-84`(Vercel → byb.kr 이전)가 2026-11-23에 끝났다.
- 운영 확인(2026-11-23): `server: nginx/1.31.8`이고 `x-vercel` 헤더는 없다. h1이 "세상의 말을, 하나씩 내 것으로"다.
  `/french/numbers`가 200이다. study-fr.byb.kr이 200이고 ftf.byb.kr은 study-fr로 301을 준다.
  Image 실행 45101668052를 다시 돌린 2차 시도가 성공했다.

## 남은 일

- Vercel 프로젝트(yongbae-bangs-projects/lang-byb-kr) 정리. 사용자 확인을 받은 뒤 한다.
  순서: 도메인 떼기 → 프로젝트 삭제 → GitHub의 Vercel 앱 권한 줄이기.
  그 전까지는 push마다 Vercel 빌드가 시도되고 실패하지만 해는 없다.

## 알아 둘 것

- `/french`는 원래부터 404다. 숫자 연습은 `/french/numbers`에 있다.
- 이 맥에서 `node_modules`의 esbuild가 다른 CPU용으로 깔려 있어 빌드가 안 된 적이 있다. `npm ci`로 다시 설치하면 된다.
- 이 맥에는 Docker가 떠 있지 않다. 이미지는 GitHub Actions에서만 빌드한다.
- Playwright 1.37에는 시계 고정(`page.clock`) 기능이 없다. 날짜에 따라 바뀌는 판단은 단위 시험(`src/lib/languages.test.ts`)에서 확인한다.
- 통합 시험은 패치된 시스템 Chrome만 쓴다(`tests/browser.ts`).
