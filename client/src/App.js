import { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatLog from './components/chatLog';
import ChatEntry from './components/chatEntry';

require('dotenv').config();

const endPoint = process.env.localhost; //Set the endpoint

function App() {

  const [id, setID] = useState();
  const [socketLoaded, setSocketLoaded] = useState(false); //Socket is not loaded at first

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(endPoint); //Create the socket
    setSocketLoaded(true); //Will force the page to re-render to make sure socket is not undefined
    socketRef.current.on('connect', () => {
      setID(socketRef.current.id); //Each new connection is assigned an id, this id is used to identify the user
    })
  }, []);

  return (
    <div className='App'>
      <div className='title'>
        <h1>Web Socket Chat</h1>
      </div>
      <div className="chatArea">
        <ChatLog socket={socketRef.current}/>
        <ChatEntry socket={socketRef.current} id={id}/>
      </div>
    </div>
  )
}

export default App;
