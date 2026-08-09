import React from 'react';

const ConnectionStatus = ({ status }) => {
  let indicatorColor = '#f59e0b'; // yellow for connecting
  let statusText = 'Connecting...';
  let badgeBg = 'rgba(245, 158, 11, 0.15)';
  let textColor = '#fbbf24';

  if (status === 'connected') {
    indicatorColor = '#10b981';
    statusText = 'Connected';
    badgeBg = 'rgba(16, 185, 129, 0.15)';
    textColor = '#34d399';
  } else if (status === 'disconnected') {
    indicatorColor = '#ef4444';
    statusText = 'Disconnected';
    badgeBg = 'rgba(239, 68, 68, 0.15)';
    textColor = '#f87171';
  }

  return (
    <div style={{ ...styles.badge, backgroundColor: badgeBg, color: textColor }}>
      <span style={{ ...styles.dot, backgroundColor: indicatorColor }} />
      <span>{statusText}</span>
    </div>
  );
};

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
};

export default ConnectionStatus;
