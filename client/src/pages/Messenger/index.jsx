import "./index.scss";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Navbar from "../../components/Navbar";
import Conversation from "../../components/conversation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Message from "../../components/Message";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { io } from "socket.io-client";



export default function Messenger() {

    const [inputValue, setInputValue] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [allConversation, setAllConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivedMessage, setArrivedMessage] = useState(null);
    const [chatUser, setChatUser] = useState({});
    const messageRef = useRef();
    const { user } = useAuth();
    const socket = useRef();


    useEffect(() => {
        // socket.current = io("http://localhost:8000");
        socket.current = io("https://social-hub-server-ebsq.onrender.com");
        socket.current.on("getMessage", ({ message, senderId }) => {
            setArrivedMessage({
                senderId,
                content: message,
                createdAt: Date.now()
            });
        });
    }, [])

    useEffect(() => {
        arrivedMessage &&
            currentChat?.members.includes(arrivedMessage.senderId) &&
            setMessages(prev => [...prev, arrivedMessage]);
    }, [arrivedMessage, currentChat])

    useEffect(() => {
        socket.current.emit("newUser", user.other._id);
    }, [user]);


    useEffect(() => {
        const getAllConversation = async () => {
            try {
                const response = await axios.get(`/api/conversation/${user.other._id}`);
                setAllConversation(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllConversation();
    }, [user.other._id]);

    useEffect(() => {
        const getAllMessages = async () => {
            if (!currentChat) return;
            try {
                const response = await axios.get(`/api/message/${currentChat._id}`);
                setMessages(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllMessages();
    }, [currentChat]);

    useEffect(() => {
        const getChatUser = async () => {
            if (!currentChat) return;
            const friendId = currentChat.members.find(m => m !== user.other._id);
            try {
                const response = await axios.get(`/api/user/${friendId}`);
                setChatUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getChatUser();
    }, [currentChat, user]);

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, messageRef]);

    const sendMessage = async () => {
        if (inputValue.trim() === "") return;
        const message = {
            senderId: user.other._id,
            conversationId: currentChat?._id,
            content: inputValue
        }

        const receiverId = currentChat.members.find(m => m !== user.other._id);
        socket.current.emit("sendMessage", user.other._id, receiverId, inputValue);

        try {
            const response = await axios.post("/api/message", message);
            setMessages((prev) => [...prev, response.data]);
            setInputValue("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmojiSelect = (e) => {
        setInputValue(prev => prev + e.native);
    }

    return (
        <div>
            <Navbar />
            <div className="messenger">
                <div className="conversations">
                    <div className="conversationsWrapper">
                        <input type="search" name="" placeholder="Search for a friend" className="conversationsInput" />
                        {allConversation.map((conv) => (
                            <div key={conv._id} onClick={() => { setCurrentChat(conv) }}>
                                <Conversation key={conv._id} data={conv} convId={currentChat?._id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="messages">
                    {currentChat ? <>
                        <div className="messagesWrapper">
                            <div className="messagesBar">
                                <ArrowBackIcon onClick={() => { setCurrentChat(null) }} htmlColor="white" style={{ fontSize: "xx-large", cursor: "pointer" }} />
                                <img src={chatUser.profilePicture} alt="user" />
                                <span>{chatUser.username}</span>
                            </div>
                            <div className="messagesContainer">
                                {messages.map(
                                    (message) => (
                                        <div key={message._id} ref={messageRef}>
                                            <Message key={message._id} own={message.senderId === user.other._id} data={message} />
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="messagesSender">
                                <EmojiEmotionsOutlinedIcon
                                    onClick={() => { setIsPickerVisible(prev => !prev) }}
                                    htmlColor="white"
                                    style={{ fontSize: "xx-large", cursor: "pointer" }}
                                />
                                {isPickerVisible &&
                                    <div className="emojiPicker">
                                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                    </div>
                                }
                                <div className="inputContainer">
                                    <input
                                        type="text"
                                        name="message"
                                        value={inputValue}
                                        onChange={(e) => { setInputValue(e.target.value) }}
                                        placeholder="Message"
                                    />
                                    <SendOutlinedIcon style={{ cursor: "pointer" }} onClick={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </> : <span className="previewText">Open a conversation to start a chat.</span>}
                </div>
            </div>
        </div>
    )
}
