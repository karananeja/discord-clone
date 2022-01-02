import React from 'react';
import { Avatar } from '@mui/material';
import '../css/Message.css';

const Message = ({ message, timestamp, user }) => {
  return (
    <div className='message'>
      <Avatar src={user.photo} alt={user.displayName} />
      <div className='message__info'>
        <h4>
          {user.displayName}{' '}
          <span className='message__timestamp'>
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
