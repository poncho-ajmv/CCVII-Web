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
    </div>
  );
}

export default App;
