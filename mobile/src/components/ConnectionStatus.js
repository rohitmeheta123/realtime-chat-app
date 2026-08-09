import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={[styles.badge, { backgroundColor: badgeBg }]}>
      <View style={[styles.dot, { backgroundColor: indicatorColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ConnectionStatus;
