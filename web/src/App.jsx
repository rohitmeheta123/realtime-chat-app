import React, { useState } from 'react';
import ChatPage from './pages/ChatPage';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [inputName, setInputName] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);

  const handleStartChat = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) return;

    setUsername(trimmed);
    setIsChatActive(true);
  };

  const handleSwitchUser = () => {
    setIsChatActive(false);
  };

  if (isChatActive && username) {
    return <ChatPage username={username} onSwitchUser={handleSwitchUser} />;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.badge}>REAL-TIME CHAT</div>
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>Enter your name to join the conversation</p>

        <form onSubmit={handleStartChat} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username-input">Your Name</label>
            <input
              id="username-input"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g. Rohit"
              style={styles.input}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!inputName.trim()}
            style={{
              ...styles.button,
              opacity: !inputName.trim() ? 0.5 : 1,
              cursor: !inputName.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Start Chat
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem 2rem',
    borderRadius: '20px',
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    background: 'rgba(99, 102, 241, 0.15)',
    color: '#818cf8',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '0.9375rem',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    textAlign: 'left',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#cbd5e1',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(15, 23, 42, 0.6)',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1rem',
    marginTop: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)',
    transition: 'all 0.2s',
  },
};

export default App;
