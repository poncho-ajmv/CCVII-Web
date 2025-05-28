import { useEffect, useState } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import './styles.css';

function App() {
  const [history, setHistory] = useState(['index.md']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const currentDoc = history[currentIndex];

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navigateTo = (file) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(file);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <header className="header">
        <div className="nav-buttons">
          <button onClick={goBack} disabled={currentIndex === 0}>←</button>
          <button onClick={goForward} disabled={currentIndex === history.length - 1}>→</button>
        </div>
        <button className="home-button" onClick={() => navigateTo('index.md')}>
          Documentación Sistema Operativo CC7
        </button>

        <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙 ' : '☀️'}
        </button>
      </header>

      <main>
        <MarkdownViewer file={currentDoc} onNavigate={navigateTo} />
      </main>
      <footer className="footer">
       <a href="https://github.com/ErnestoAragon03/CCVII" target="_blank" rel="noopener noreferrer">Repo</a>·
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
