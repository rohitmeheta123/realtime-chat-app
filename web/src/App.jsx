import { useEffect, useState } from 'react';
import { checkHealth } from './services/api';
import { createSocketConnection } from './services/socket';
import './index.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    // Health check
    checkHealth()
      .then((data) => {
        if (data.success) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      })
      .catch(() => setBackendStatus('error'));

    // Socket connection
    const socket = createSocketConnection();

    socket.on('connect', () => {
      setSocketStatus('connected');
      setSocketId(socket.id);
    });

    socket.on('disconnect', () => {
      setSocketStatus('disconnected');
      setSocketId('');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>Development Mode</div>
        <h1 style={styles.title}>Real-Time Chat</h1>
        <p style={styles.subtitle}>Web client is running.</p>

        <div style={styles.statusGrid}>
          <div style={styles.statusBox}>
            <div style={styles.statusHeader}>
              <span style={styles.statusLabel}>Backend REST API</span>
              <span
                style={{
                  ...styles.indicator,
                  backgroundColor: backendStatus === 'connected' ? '#10b981' : backendStatus === 'checking' ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
            <span style={styles.statusValue}>{backendStatus}</span>
          </div>

          <div style={styles.statusBox}>
            <div style={styles.statusHeader}>
              <span style={styles.statusLabel}>Socket.io Status</span>
              <span
                style={{
                  ...styles.indicator,
                  backgroundColor: socketStatus === 'connected' ? '#10b981' : '#ef4444',
                }}
              />
            </div>
            <span style={styles.statusValue}>
              {socketStatus === 'connected' ? `Connected (${socketId})` : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    padding: '2.5rem',
    borderRadius: '20px',
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    background: 'rgba(99, 102, 241, 0.15)',
    color: '#818cf8',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    textAlign: 'left',
  },
  statusBox: {
    padding: '1rem',
    borderRadius: '12px',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  statusLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600',
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  statusValue: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#e2e8f0',
    wordBreak: 'break-all',
  },
};

export default App;
