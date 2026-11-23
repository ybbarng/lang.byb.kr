# HANDOFF — lang.byb.kr

마지막 갱신: 2026-11-23

## 지금 상태 한 줄

새 홈과 byb.kr 서버 배포 구성은 main에 올라갔다(8a55752). 운영(https://lang.byb.kr)은 아직 Vercel의 2023년 판이다.
servers 세션이 서버 쪽 일을 마치면 바뀐다.

## 진행 중인 일: Vercel → byb.kr 서버 이전

요청 번호: 비서 요청 `R-20261123-1127-8i`(홈 만들기), 후속 `R-20261123-1137-84`(이전).
사용자가 이전 전체를 2026-11-23에 승인했다. 서버 쪽은 servers 창에서 따로 다시 승인받는다.

| 단계 | 누가 | 상태 |
|---|---|---|
| adapter-static 전환, Vercel 통계 제거 | 이 저장소 | 끝(5438ee5, f574e2d) |
| Dockerfile·ops/nginx.conf·.github/workflows/image.yml | 이 저장소 | 끝. Actions 실행 45101668052에서 build 성공, deploy는 배포 키가 없어 예상대로 실패 |
| servers `byb.kr/apps/lang/`(compose·deploy.sh), 배포 키·authorized_keys, GitHub secrets(SERVER_SSH_KEY·SERVER_HOST·SERVER_USER) | servers 세션(비서 경유) | 기다리는 중. FTF 이전 다음 순서 |
| 첫 배포: `gh run rerun 45101668052 -R ybbarng/lang.byb.kr --failed` 또는 workflow_dispatch | servers 세션 | 기다리는 중 |
| DNS: dnsever에서 lang.byb.kr을 VPS(115.68.185.114)로 | servers 세션·사용자 | 기다리는 중 |

servers 쪽이 끝났다고 알려 오면 이 저장소 세션이 할 일:
1. 운영 확인: `curl -sI https://lang.byb.kr/`에 `x-vercel` 헤더가 없다. 첫 화면 h1이 "세상의 말을, 하나씩 내 것으로"다.
   `https://lang.byb.kr/french/numbers`가 200이다. `https://study-fr.byb.kr`이 열린다. 홈의 프랑스어 단추가 이 주소로 간다.
2. 비서 세션(secretary)에 `[R-20261123-1127-8i]` 완료를 한 줄로 알린다.
3. Vercel 프로젝트(yongbae-bangs-projects/lang-byb-kr)를 끌지 사용자에게 묻는다.
   그 전까지는 push마다 Vercel 빌드가 시도되고 실패하지만 해는 없다.

## 알아 둘 것

- `/french`는 원래부터 404다. 숫자 연습은 `/french/numbers`에 있다.
- 이 맥에서 `node_modules`의 esbuild가 다른 CPU용으로 깔려 있어 빌드가 안 된 적이 있다. `npm ci`로 다시 설치하면 된다.
- 이 맥에는 Docker가 떠 있지 않다. 이미지는 GitHub Actions에서만 빌드해 봤다.
- Playwright 1.37에는 시계 고정(`page.clock`) 기능이 없다. 날짜에 따라 바뀌는 판단은 단위 시험(`src/lib/languages.test.ts`)에서 확인한다.
- 통합 시험은 패치된 시스템 Chrome만 쓴다(`tests/browser.ts`).
