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
import TypingIndicator from '../components/TypingIndicator';
import { useChat } from '../hooks/useChat';

const ChatScreen = ({ username, onSwitchUser }) => {
  const {
    messages,
    onlineUsers,
    typingUsers,
    connectionStatus,
    isLoading,
    error,
    sendMessage,
    sendTypingStart,
    sendTypingStop,
  } = useChat(username);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ChatHeader
          username={username}
          status={connectionStatus}
          onlineUsers={onlineUsers}
          onLeave={onSwitchUser}
        />
        <MessageList
          messages={messages}
          currentUsername={username}
          isLoading={isLoading}
          error={error}
        />
        <TypingIndicator typingUsers={typingUsers} currentUsername={username} />
        <MessageInput
          onSendMessage={sendMessage}
          onTypingStart={sendTypingStart}
          onTypingStop={sendTypingStop}
          isConnected={connectionStatus === 'connected'}
        />
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
