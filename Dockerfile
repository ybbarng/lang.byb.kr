# lang.byb.kr 이미지: 미리 그린 정적 파일(build/)을 nginx로 내려준다.
# 빌드는 GitHub Actions에서 한다(byb.kr 서버에서 빌드하지 않는다). star.byb.kr 의 Dockerfile 을 본떴다.
#   docker build -t lang .   →   docker run -p 8080:80 lang

# 1) 빌드: SvelteKit adapter-static → build/
FROM node:20.11.0-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# 2) 내려주기: nginx에 build/ 와 설정만
FROM nginx:1.31.8-alpine AS runner
COPY ops/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
# 설정이 틀리면 여기서 이미지 빌드가 멈춰 서버까지 가지 않는다
RUN nginx -t
EXPOSE 80
