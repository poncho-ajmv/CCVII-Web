import { useEffect, useState } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import './styles.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'es');

  const [currentDoc, setCurrentDoc] = useState(() => {
    const base = window.location.pathname.slice(1) || 'index.md';
    const lang = localStorage.getItem('language') || 'es';
    return decodeURIComponent(base).replace(/\.md$/, lang === 'en' ? '.en.md' : '.md');
  });

  // Aplica el tema al body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Guarda el idioma en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Actualiza el archivo cuando cambia el idioma
  useEffect(() => {
    const baseName = currentDoc.replace(/\.en\.md$|\.md$/, '');
    const newFile = language === 'en' ? `${baseName}.en.md` : `${baseName}.md`;
    setCurrentDoc(newFile);
  }, [language]);

  // Maneja navegación con el botón del navegador
  useEffect(() => {
    const handlePopState = () => {
      const base = window.location.pathname.slice(1) || 'index.md';
      const file = base.replace(/\.md$/, language === 'en' ? '.en.md' : '.md');
      setCurrentDoc(decodeURIComponent(file));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Función para navegar a otro archivo (solo base)
  const navigateTo = (fileBase) => {
    const file = language === 'en'
  ? `${fileBase.replace(/(\.en)?\.md$/, '')}.en.md`
  : `${fileBase.replace(/(\.en)?\.md$/, '')}.md`;

    const path = `/${encodeURIComponent(fileBase)}`;
    window.history.pushState(null, '', path);
    setCurrentDoc(file);
  };

  return (
    <div>
      <header className="header">
        <div className="lang-button-container">
          <button className="lang-toggle" onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')}>
            {language === 'es' ? '🇪🇸' : '🇺🇸'}
          </button>
        </div>

        <button className="home-button" onClick={() => navigateTo('index.md')}>
          Documentación Sistema Operativo CC7
        </button>

        <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>


      <main>
        <MarkdownViewer file={currentDoc} onNavigate={navigateTo} />
      </main>

      <footer className="footer">
        <a href="https://github.com/ErnestoAragon03/CCVII" target="_blank" rel="noopener noreferrer">Repo</a> ·
        <span>Created by ·</span>
        <a href="https://github.com/ErnestoAragon03" target="_blank" rel="noopener noreferrer">Ernesto</a> ·
        <a href="https://github.com/ChristianSosa22" target="_blank" rel="noopener noreferrer">Christian</a> ·
        <a href="https://github.com/poncho-ajmv" target="_blank" rel="noopener noreferrer">Poncho</a> ·
        <span>· May 2025</span>
      </footer>
    </div>
  );
}

export default App;
