import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import UsernameScreen from './src/screens/UsernameScreen';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const [username, setUsername] = useState('');

  const handleStartChat = (name) => {
    setUsername(name);
  };

  const handleSwitchUser = () => {
    setUsername('');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      {username ? (
        <ChatScreen username={username} onSwitchUser={handleSwitchUser} />
      ) : (
        <UsernameScreen onStartChat={handleStartChat} />
      )}
    </>
  );
}
