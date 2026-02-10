import { useMemo, useState } from 'react'
import './App.css'

const pages = {
  home: {
    title: 'Home',
    description: '첫 화면입니다. SPA에서 전체 새로고침 없이 섹션만 전환됩니다.',
  },
  products: {
    title: 'Products',
    description: '상품 목록 화면 예시입니다. 실제 프로젝트에서는 API 데이터를 연결하면 됩니다.',
  },
  contact: {
    title: 'Contact',
    description: '문의 화면 예시입니다. 폼/검증 로직을 여기에 추가할 수 있습니다.',
  },
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const currentPage = useMemo(() => pages[activePage], [activePage])

  return (
    <main className="app-shell">
      <header className="header">
        <h1>React SPA Screen Demo</h1>
        <p>버튼으로 화면 전환 예시를 확인해보세요.</p>
      </header>

      <nav className="nav">
        {Object.entries(pages).map(([key, page]) => (
          <button
            key={key}
            className={activePage === key ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActivePage(key)}
            type="button"
          >
            {page.title}
          </button>
        ))}
      </nav>

      <section key={activePage} className="page">
        <h2>{currentPage.title}</h2>
        <p>{currentPage.description}</p>
      </section>
    </main>
  )
}

export default App
