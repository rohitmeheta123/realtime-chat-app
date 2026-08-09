import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useChat } from '../hooks/useChat';

const ChatScreen = ({ username, onSwitchUser }) => {
  const { messages, connectionStatus, isLoading, error, sendMessage } = useChat(username);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ChatHeader username={username} status={connectionStatus} onLeave={onSwitchUser} />
        <MessageList
          messages={messages}
          currentUsername={username}
          isLoading={isLoading}
          error={error}
        />
        <MessageInput onSendMessage={sendMessage} isConnected={connectionStatus === 'connected'} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});

export default ChatScreen;
