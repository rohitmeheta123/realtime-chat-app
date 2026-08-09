import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, currentUsername, isLoading, error }) => {
  const bottomRef = useRef(null);

  // Auto scroll to bottom when messages change or finish loading
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (isLoading) {
    return (
      <div style={styles.centerState}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerState}>
        <p style={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div style={styles.centerState}>
        <div style={styles.emptyIcon}>💬</div>
        <p style={styles.emptyTitle}>No messages yet.</p>
        <p style={styles.emptySubtitle}>Start the conversation!</p>
      </div>
    );
  }

  return (
    <div style={styles.listContainer}>
      {messages.map((msg) => (
        <MessageBubble key={msg._id || Math.random()} message={msg} currentUsername={currentUsername} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

const styles = {
  listContainer: {
    flex: 1,
    padding: '1.25rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  centerState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    marginTop: '0.75rem',
  },
  errorText: {
    color: '#f87171',
    fontSize: '0.875rem',
  },
  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  emptyTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#e2e8f0',
    margin: '0 0 0.25rem 0',
  },
  emptySubtitle: {
    fontSize: '0.8125rem',
    color: '#64748b',
    margin: 0,
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default MessageList;
