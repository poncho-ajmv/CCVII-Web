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
    <div style={{ fontSize: '18px', lineHeight: '1.9' }}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            return (
              <button
                style={{
                  color: '#007acc',
                  fontWeight: '500',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
                onClick={() => onNavigate(href)}
              >
                {children}
              </button>
            );
          },
          h1: ({ children }) => <h1 style={{ fontSize: '2.5rem', marginTop: '2.5rem', borderBottom: '3px solid currentColor' }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ fontSize: '2rem', marginTop: '2rem', color: '#295073' }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ fontSize: '1.6rem', marginTop: '1.5rem', color: '#406880' }}>{children}</h3>,
          h4: ({ children }) => <h4 style={{ fontSize: '1.3rem', marginTop: '1.2rem', color: '#506070' }}>{children}</h4>,
          p: ({ children }) => <p style={{ marginTop: '1rem', textAlign: 'justify' }}>{children}</p>,
          ul: ({ children }) => <ul style={{ paddingLeft: '2rem', marginTop: '1rem', listStyleType: 'disc' }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ paddingLeft: '2rem', marginTop: '1rem' }}>{children}</ol>,
          li: ({ children }) => <li style={{ marginTop: '0.6rem' }}>{children}</li>,
          table: ({ children }) => (
            <table
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                marginTop: '2rem',
                fontSize: '16px',
                backgroundColor: 'inherit', // heredado para respetar tema
                border: '1px solid #888'    // contorno general
              }}
            >
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead
              style={{
                backgroundColor: 'rgba(200,200,200,0.1)', // semitransparente para ambos modos
                color: 'inherit',
              }}
            >
              {children}
            </thead>
          ),
          tr: ({ children }) => (
            <tr
              style={{
                borderBottom: '1px solid #aaa'
              }}
            >
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: '10px',
                border: '1px solid #aaa',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: 'rgba(220,220,220,0.15)',
                color: 'inherit'
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: '10px',
                border: '1px solid #888',
                textAlign: 'center',
                color: 'inherit'
              }}
            >
              {children}
            </td>
          ),
          
        }}
      />
    </div>
  );
}

export default MarkdownViewer;
