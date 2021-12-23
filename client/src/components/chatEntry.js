import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './../App.css';

const ChatEntry = (props) => {

  const socket = props.socket;

  const sendMessage = (e) => {
    e.preventDefault();
    if (e.target.message.value !== '' && e.target.name.value !== '') { //Make sure the user entered a message & name
      socket.emit('sendMessage', { //Emit the name and message
        name: e.target.name.value,
        messageContent: e.target.message.value
      })
      e.target.message.value = ''; //Clear the text field
    }
  }


  return (
    <div className='chatEntry'>
      <form onSubmit={sendMessage} autoomplete='off'>
        <InputGroup className='chatEntryBox'>
          <FormControl type='text' name='name' size='lg' placeholder='Enter a name' aria-label='Enter a name' autocomplete='off'/>
          <FormControl type='text' name='message' size='lg' placeholder='Enter a message' aria-label='Enter message' autoComplete='off'/>
          <InputGroup.Append>
            <Button variant='primary' size='lg' type='submit'>Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  )
}

export default ChatEntry;