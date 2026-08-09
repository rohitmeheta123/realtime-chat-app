import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isConnected }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || isSubmitting || !isConnected) return;

    setIsSubmitting(true);
    setSendError('');

    try {
      await onSendMessage(trimmed);
      setText('');
    } catch (err) {
      console.error('[MessageInput Error]:', err);
      setSendError(err.message || 'Unable to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      {sendError ? <div style={styles.errorBanner}>{sendError}</div> : null}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? 'Type a message...' : 'Connecting to chat server...'}
          disabled={!isConnected || isSubmitting}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={!text.trim() || !isConnected || isSubmitting}
          style={{
            ...styles.button,
            opacity: !text.trim() || !isConnected || isSubmitting ? 0.5 : 1,
            cursor: !text.trim() || !isConnected || isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem 1.25rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(12px)',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background: 'rgba(30, 41, 59, 0.6)',
    color: '#ffffff',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.9375rem',
    transition: 'all 0.2s',
  },
  errorBanner: {
    marginBottom: '0.5rem',
    padding: '0.4rem 0.75rem',
    borderRadius: '8px',
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    fontSize: '0.75rem',
  },
};

export default MessageInput;
