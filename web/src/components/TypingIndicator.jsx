import React from 'react';

const TypingIndicator = ({ typingUsers = [], currentUsername }) => {
  // Filter out current user's own username if present
  const otherTypingUsers = typingUsers.filter((user) => user !== currentUsername);

  if (!otherTypingUsers || otherTypingUsers.length === 0) {
    return null;
  }

  let text = '';
  if (otherTypingUsers.length === 1) {
    text = `${otherTypingUsers[0]} is typing...`;
  } else if (otherTypingUsers.length === 2) {
    text = `${otherTypingUsers[0]} and ${otherTypingUsers[1]} are typing...`;
  } else {
    text = `${otherTypingUsers[0]} and ${otherTypingUsers.length - 1} others are typing...`;
  }

  return (
    <div style={styles.container}>
      <span style={styles.dot} />
      <span style={styles.text}>{text}</span>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 1.5rem',
    fontSize: '0.8125rem',
    color: '#a7f3d0',
    fontStyle: 'italic',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#34d399',
    display: 'inline-block',
  },
  text: {
    color: '#94a3b8',
  },
};

export default TypingIndicator;
