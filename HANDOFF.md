# HANDOFF — lang.byb.kr

마지막 갱신: 2026-11-23

## 지금 상태 한 줄

https://lang.byb.kr 은 byb.kr 서버(nginx 컨테이너, Traefik 뒤)에서 새 홈을 내준다. main push → GitHub Actions(Image)가
이미지를 만들어 servers 저장소 `byb.kr/apps/lang/deploy.sh`로 배포한다. Gatus 감시와 servers `sites.md`·`dns.md`도 반영됐다.

## 끝난 일

- 비서 요청 `R-20261123-1127-8i`(언어 공부 홈)와 후속 `R-20261123-1137-84`(Vercel → byb.kr 이전)가 2026-11-23에 끝났다.
- 운영 확인(2026-11-23): `server: nginx/1.31.8`이고 `x-vercel` 헤더는 없다. h1이 "세상의 말을, 하나씩 내 것으로"다.
  `/french/numbers`는 study-fr.byb.kr/numbers 로 301을 준다. study-fr.byb.kr이 200이고 ftf.byb.kr은 study-fr로 301을 준다.
  마지막 배포는 Image 실행 45103809723이다(빌드·배포 성공).

## 남은 일

- 이 저장소에 남은 일은 없다.
- Vercel의 lang-byb-kr 프로젝트는 2026-11-23 사용자가 지웠다. 이 저장소의 push로 Vercel 빌드가 돌던 일은 이제 없다.
  남은 Vercel 프로젝트 셋(socket-io-chat-app, online-set-game, set)은 git 연결도 운영 배포도 없어 이 저장소와 무관하다.
  지울지와 GitHub의 Vercel 앱(설치 453362)을 지울지는 사용자가 정할 일이다.

## 알아 둘 것

- 프랑스어 숫자 듣기는 2026-11-23 study-fr.byb.kr/numbers 로 옮겼다(비서 요청 `R-20261123-1202-e6`). 옛 Svelte 화면 코드는 지웠고,
  옛 주소 `/french/numbers`는 `ops/nginx.conf`가 301로 넘긴다. `/french`는 원래부터 404다.
- 이 맥에서 `node_modules`의 esbuild가 다른 CPU용으로 깔려 있어 빌드가 안 된 적이 있다. `npm ci`로 다시 설치하면 된다.
- 이 맥에는 Docker가 떠 있지 않다. 이미지는 GitHub Actions에서만 빌드한다.
- Playwright 1.37에는 시계 고정(`page.clock`) 기능이 없다. 날짜에 따라 바뀌는 판단은 단위 시험(`src/lib/languages.test.ts`)에서 확인한다.
- 통합 시험은 패치된 시스템 Chrome만 쓴다(`tests/browser.ts`).
