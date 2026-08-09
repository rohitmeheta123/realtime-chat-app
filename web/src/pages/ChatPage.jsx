import React from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useChat } from '../hooks/useChat';

const ChatPage = ({ username, onSwitchUser }) => {
  const { messages, connectionStatus, isLoading, error, sendMessage } = useChat(username);

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatCard}>
        <ChatHeader username={username} status={connectionStatus} onLeave={onSwitchUser} />
        <MessageList
          messages={messages}
          currentUsername={username}
          isLoading={isLoading}
          error={error}
        />
        <MessageInput onSendMessage={sendMessage} isConnected={connectionStatus === 'connected'} />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    height: '100vh',
    maxHeight: '900px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  chatCard: {
    width: '100%',
    maxWidth: '800px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    background: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
};

export default ChatPage;
