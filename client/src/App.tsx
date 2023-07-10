

import { useState } from 'react';
import './App.css'
import { useSocket } from './hooks'

function App() {
  const { socket, messages } = useSocket()
  const [value, setValue] = useState('');


  const handleSubmit = () => {



    socket.emit(`message`, value);
    setValue('')
  }


  


  return (
    <>

      <ul id="messages">
        {messages?.map((item, index) => <li key={`${item}${index}`}>{item}</li>)}
      </ul>
      <form id="form" onSubmit={event => {
        event.preventDefault();
        handleSubmit()
      }}>
        <input id="input" value={value} onChange={event => setValue(event?.target?.value)} autoComplete="off" onKeyDown={event => {
          if (event.keyCode === 13) {
            event.preventDefault();
handleSubmit()
          }
        }} />
        <button type='button' onClick={handleSubmit}>Send</button>
      </form>
    </>
  )
}

export default App
