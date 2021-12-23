import React, { useEffect, useState } from 'react';
import './../App.css';

const ChatLog = (props) => {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.socket) { //Make sure props.socket is not defined
      props.socket.on('updateMessages', (newMessage) => { //Updates messages each time a client sent a message
        setMessages(messages => messages.concat(newMessage)); //Add the messages to the list
      })
    }
  }, [props.socket])

  return (
    <div className='chatLog'>
      <ul className='logMessages'>
        {messages.map((message) => <li>{message.name + ' : ' + message.messageContent}</li>)}
      </ul>
    </div>
  )
}

export default ChatLog;