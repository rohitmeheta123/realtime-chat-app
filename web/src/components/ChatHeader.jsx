import React from 'react';
import ConnectionStatus from './ConnectionStatus';

const ChatHeader = ({ username, status, onLeave }) => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Real-Time Chat</h1>
        <p style={styles.userText}>
          You are chatting as <strong style={styles.usernameHighlight}>{username}</strong>
        </p>
      </div>
      <div style={styles.right}>
        <ConnectionStatus status={status} />
        {onLeave && (
          <button style={styles.leaveButton} onClick={onLeave} title="Change Username">
            Switch Name
          </button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(12px)',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: 0,
    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  userText: {
    fontSize: '0.8125rem',
    color: '#94a3b8',
    margin: 0,
  },
  usernameHighlight: {
    color: '#818cf8',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  leaveButton: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#cbd5e1',
    padding: '0.35rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default ChatHeader;
