import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Style Sheet
import '../styles/Chat.css'

// Components and Others
import {useStateValue} from '../context/StateProvider';

// Icons
import { Avatar, IconButton } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { AttachFile, SearchOutlined } from '@material-ui/icons';

// DataBase Firebase
import db from '../firebase'
import firebase from 'firebase'

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {setRoomName(snapshot.data().name)})

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`You type >>>>> ${input}`);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]
                            ?.timestamp?.toDate()
                        ).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    // in production is better to do the comparison below of ids and not names
                    // as two user might have same user id
                    <p className={`chat_message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form action="" method="post">
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" 
                        name="" id="" 
                        placeholder="Type a message"
                    />
                    <button 
                        onClick={sendMessage} 
                        type="submit">
                            Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat;
