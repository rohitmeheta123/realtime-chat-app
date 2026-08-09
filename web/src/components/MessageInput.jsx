import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSendMessage, onTypingStart, onTypingStop, isConnected }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState('');
  const isTypingRef = useRef(false);
  const typingTimerRef = useRef(null);

  const stopTyping = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      if (onTypingStop) onTypingStop();
    }
  };

  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    if (sendError) setSendError('');

    if (!val.trim()) {
      stopTyping();
      return;
    }

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      if (onTypingStart) onTypingStart();
    }

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      stopTyping();
    }, 1500);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isSubmitting || !isConnected) return;

    stopTyping();
    setIsSubmitting(true);
    setSendError('');

    try {
      await onSendMessage(trimmed);
      setText('');
    } catch (err) {
      console.error('[Web MessageInput Error]:', err);
      setSendError(err.message || 'Unable to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const isButtonDisabled = !text.trim() || !isConnected || isSubmitting;

  return (
    <form onSubmit={handleSend} style={styles.form}>
      {sendError && <div style={styles.errorBanner}>{sendError}</div>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? 'Type a message...' : 'Connecting to chat...'}
          disabled={!isConnected || isSubmitting}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          style={{
            ...styles.button,
            ...(isButtonDisabled ? styles.buttonDisabled : {}),
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(15, 23, 42, 0.8)',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    padding: '0.4rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.8125rem',
    marginBottom: '0.5rem',
  },
  inputContainer: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: '#0f172a',
    color: '#ffffff',
    fontSize: '0.9375rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '24px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.9375rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default MessageInput;
