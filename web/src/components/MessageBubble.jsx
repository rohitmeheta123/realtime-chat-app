import React from 'react';
import { formatTime } from '../utils/formatTime';

const MessageBubble = ({ message, currentUsername }) => {
  const isOwn = message.sender === currentUsername;

  return (
    <div style={{ ...styles.container, justifyContent: isOwn ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          ...styles.bubble,
          ...(isOwn ? styles.ownBubble : styles.otherBubble),
        }}
      >
        {!isOwn && <div style={styles.sender}>{message.sender}</div>}
        <div style={styles.text}>{message.message}</div>
        <div style={{ ...styles.time, textAlign: isOwn ? 'right' : 'left' }}>
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    margin: '0.35rem 0',
  },
  bubble: {
    maxWidth: '75%',
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    wordBreak: 'break-word',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
  },
  ownBubble: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  otherBubble: {
    background: 'rgba(30, 41, 59, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#f1f5f9',
    borderBottomLeftRadius: '4px',
  },
  sender: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#a7f3d0',
    marginBottom: '0.25rem',
  },
  text: {
    fontSize: '0.9375rem',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
  },
  time: {
    fontSize: '0.6875rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '0.35rem',
  },
};

export default MessageBubble;
