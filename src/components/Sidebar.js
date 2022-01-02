import React, { useEffect, useState } from 'react';
import {
  Add,
  Call,
  ExpandMore,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import SidebarChannel from './SidebarChannel';
import '../css/Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import firebase from 'firebase';

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Please Enter the Channel Name!');
    if (channelName) {
      db.collection('channels').add({
        channelName: channelName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>{user.displayName}'s Room</h3>
        <ExpandMore />
      </div>
      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMore />
            <h4>Text Channels</h4>
          </div>
          <Add className='sidebar__addChannel' onClick={handleAddChannel} />
        </div>
        <div className='sidebar__channelsList'>
          {channels.map(({ id, data }) => (
            <SidebarChannel key={id} id={id} channel={data.channelName} />
          ))}
        </div>
      </div>
      <div className='sidebar__voice'>
        <SignalCellularAlt className='sidebar__voiceIcon' fontSize='large' />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className='sidebar__voiceIcons'>
          <InfoOutlined />
          <Call />
        </div>
      </div>
      <div className='sidebar__profile'>
        <Avatar
          src={user.photo}
          alt={user.displayName}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
