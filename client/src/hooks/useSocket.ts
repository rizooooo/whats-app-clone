import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io('http://localhost:8000')

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messages, setMessages] = useState<string[]>([])

const handleMessages = (message : string) => {
  setMessages(prev => [...prev, message])
}
    const onConnect = () => {
       setIsConnected(true)
    }
    const onDisconnect = () => {
        setIsConnected(false)
    }
    

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect",onDisconnect);
        socket.on('messages', handleMessages)

        return () => {
          socket.off('messages', handleMessages);
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
          };
    }, [])
    
  return {
    socket,
    isConnected,
    messages
  }
}
