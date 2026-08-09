import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TypingIndicator = ({ typingUsers = [], currentUsername }) => {
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
    <View style={styles.container}>
      <Text style={styles.text}>✍️ {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#0f172a',
  },
  text: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});

export default TypingIndicator;
