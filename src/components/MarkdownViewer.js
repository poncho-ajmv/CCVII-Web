import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkdownViewer({ file, onNavigate }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    import(`../docs/${file}`).then(res => {
      fetch(res.default)
        .then(r => r.text())
        .then(setContent);
    });
  }, [file]);

  return (
    <div>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            return (
              <button
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
                onClick={() => onNavigate(href)}
              >
                {children}
              </button>
            );
          },
          h1: ({ children }) => <h1 style={{ fontSize: '2rem', marginTop: '1.5rem' }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{children}</h2>,
          p: ({ children }) => <p style={{ marginTop: '0.75rem' }}>{children}</p>,
        }}
      />
    </div>
  );
}

export default MarkdownViewer;
