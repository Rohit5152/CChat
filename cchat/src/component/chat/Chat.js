import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join"
import socketIO, { Socket } from "socket.io-client";
import './Chat.css'
import sendLogo from '../../image/send.png'
import closeIcon from "../../image/closeIcon.png";
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "https://demo-cchatapp.herokuapp.com/";
let socket;
const Chat = () => {
    const [id, setid] = useState("")
    const [messages, setmessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = " ";
    }


    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] })
        socket.on('connect', () => {
            alert("connected")
            setid(socket.id)
        })
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setmessages([...messages, data]);
            console.log(data.user);
            console.log(data.message);
        })
        socket.on('userJoined', (data) => {
            setmessages([...messages, data]);
            console.log(data.user)
            console.log(data.message);
        })
        socket.on('leave', (data) => {
            setmessages([...messages, data]);
            console.log(data.user);
            console.log(data.message);
        })
        return () => {
            socket.emit('Disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendmessage', (data) => {
            setmessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])


    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(e)=> e.key==='Enter'?send():null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} /> </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
