import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { checkHealth } from './src/services/api';
import { createSocketConnection } from './src/services/socket';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    // Health check
    checkHealth()
      .then((data) => {
        if (data && data.success) {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>EXPO MOBILE</Text>
        </View>
        <Text style={styles.title}>Real-Time Chat</Text>
        <Text style={styles.subtitle}>Mobile client is running.</Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Backend REST API:</Text>
            <Text style={[styles.statusValue, backendStatus === 'connected' ? styles.successText : styles.errorText]}>
              {backendStatus}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Socket.io Status:</Text>
            <Text style={[styles.statusValue, socketStatus === 'connected' ? styles.successText : styles.errorText]}>
              {socketStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
          {socketId ? <Text style={styles.socketIdText}>ID: {socketId}</Text> : null}
        </View>

        <Text style={styles.note}>
          Note: Use LAN IP (e.g. 192.168.x.x) in EXPO_PUBLIC_API_URL when running on physical mobile devices.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  statusLabel: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  successText: {
    color: '#10b981',
  },
  errorText: {
    color: '#ef4444',
  },
  socketIdText: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  note: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
