import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Cargar todos los archivos Markdown de la carpeta docs y subcarpetas
const context = require.context('../docs', true, /\.md$/);

function MarkdownViewer({ file, onNavigate }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const trimmedFile = `./${file.trim()}`;
    try {
      const markdownFile = context(trimmedFile);
      fetch(markdownFile)
        .then(res => res.text())
        .then(setContent);
    } catch (err) {
      console.error('Archivo Markdown no encontrado:', trimmedFile, err);
      setContent(`# Error\n\nNo se pudo cargar el archivo **${file}**.`);
    }
  }, [file]);

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const code = String(children).trim();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
      return (
        <code style={{ background: '#f0f0f0', padding: '0.2em 0.4em', borderRadius: '4px' }}>
          {code}
        </code>
      );
    }

    return (
      <div className="code-block-container">
        <pre className={className} {...props}>
          <code>{code}</code>
        </pre>
        <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    );
  };

  return (
    <div style={{ fontSize: '18px', lineHeight: '1.9' }}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            const isExternal = /^https?:\/\//.test(href);
            return isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007acc', fontWeight: '500', textDecoration: 'underline' }}
              >
                {children}
              </a>
            ) : (
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
          code: CodeBlock,
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
                backgroundColor: 'inherit',
                border: '1px solid #888'
              }}
            >
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead style={{ backgroundColor: 'rgba(200,200,200,0.1)', color: 'inherit' }}>
              {children}
            </thead>
          ),
          tr: ({ children }) => <tr style={{ borderBottom: '1px solid #aaa' }}>{children}</tr>,
          th: ({ children }) => (
            <th style={{ padding: '10px', border: '1px solid #aaa', fontWeight: 'bold', textAlign: 'center', backgroundColor: 'rgba(220,220,220,0.15)', color: 'inherit' }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: '10px', border: '1px solid #888', textAlign: 'center', color: 'inherit' }}>
              {children}
            </td>
          ),
        }}
      />
    </div>
  );
}

export default MarkdownViewer;
