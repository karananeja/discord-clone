import React from 'react';
import {
  EditLocationRounded,
  HelpRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
} from '@mui/icons-material';
import '../css/ChatHeader.css';

const ChatHeader = ({ channelName }) => {
  return (
    <div className='chatHeader'>
      <div className='chatHeader__left'>
        <h3>
          <span className='chatHeader__hash'>#</span>
          {channelName}
        </h3>
      </div>
      <div className='chatHeader__right'>
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className='chatHeader__search'>
          <input type='text' placeholder='Search' />
          <SearchRounded />
        </div>
        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
};

export default ChatHeader;
