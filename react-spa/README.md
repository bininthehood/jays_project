# React SPA

간단한 화면 전환 예시가 들어간 React SPA 프로젝트입니다.

## Local 실행

```bash
npm install
npm run dev
```

외부 기기에서 같은 네트워크로 접속 테스트:

```bash
npm run dev:public
```

## Public 배포

이 프로젝트는 SPA 새로고침 대응이 설정되어 있습니다.

- `vercel.json`: Vercel 라우팅 fallback
- `netlify.toml` / `public/_redirects`: Netlify 라우팅 fallback

### Vercel

1. GitHub에 `react-spa`를 push
2. Vercel에서 repo import
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Netlify

1. GitHub에 `react-spa`를 push
2. Netlify에서 repo import
3. Build Command: `npm run build`
4. Publish Directory: `dist`
