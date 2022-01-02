import React, { useEffect, useState } from 'react';
import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from '@mui/icons-material';
import ChatHeader from './ChatHeader';
import Message from './Message';
import '../css/Chat.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import db from '../firebase';
import firebase from 'firebase';

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('channels').doc(channelId).collection('messages').add({
      user: user,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [channelId]);

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName} />
      <div className='chat__messages'>
        {messages.map(({ id, data }) => (
          <Message
            key={id}
            timestamp={data.timestamp}
            message={data.message}
            user={data.user}
          />
        ))}
      </div>
      <div className='chat__input'>
        <AddCircle />
        <form>
          <input
            type='text'
            disabled={!channelId}
            placeholder={`Message #${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!channelId}
            className='chat__inputButton'
            type='submit'
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </form>
        <div className='chat__inputIcons'>
          <CardGiftcard fontSize='large' />
          <Gif fontSize='large' />
          <EmojiEmotions fontSize='large' />
        </div>
      </div>
    </div>
  );
};

export default Chat;
