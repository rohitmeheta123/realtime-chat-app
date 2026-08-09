import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConnectionStatus from './ConnectionStatus';

const ChatHeader = ({ username, status, onlineUsers = [], onLeave }) => {
  const onlineCount = onlineUsers.length;

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.title}>Real-Time Chat</Text>
        <View style={styles.subRow}>
          <Text style={styles.subtitle}>
            You are chatting as <Text style={styles.usernameHighlight}>{username}</Text>
          </Text>
          <Text style={styles.onlineBadge}>
            🟢 {onlineCount} online
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <ConnectionStatus status={status} />
        {onLeave && (
          <TouchableOpacity style={styles.leaveButton} onPress={onLeave}>
            <Text style={styles.leaveText}>Switch</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  usernameHighlight: {
    color: '#818cf8',
    fontWeight: '600',
  },
  onlineBadge: {
    fontSize: 11,
    color: '#34d399',
    fontWeight: '600',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leaveButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 6,
  },
  leaveText: {
    color: '#cbd5e1',
    fontSize: 12,
  },
});

export default ChatHeader;
