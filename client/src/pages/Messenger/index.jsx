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
import socket from "../../socket/socketService";



export default function Messenger() {

    const [inputValue, setInputValue] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [allConversation, setAllConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivedMessage, setArrivedMessage] = useState(null);
    const [chatUser, setChatUser] = useState({});
    const [search, setSearch] = useState("");
    const [searchConversation, setSearchConversation] = useState([]);
    const messageRef = useRef();
    const { user, countMessages } = useAuth();


    useEffect(() => {
        socket.on("getMessage", ({ message, senderId }) => {
            setArrivedMessage({
                senderId,
                content: message,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        socket.on("getMessage", ({ message, senderId }) => {
            countMessages(0);
        });
        countMessages(0);
    }, [countMessages]);

    useEffect(() => {
        arrivedMessage &&
            currentChat?.members.includes(arrivedMessage.senderId) &&
            setMessages(prev => [...prev, arrivedMessage]);
    }, [arrivedMessage, currentChat]);

    useEffect(() => {
        socket.emit("newUser", user.other._id);
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
        const getALlFollowings = async () => {
            try {
                const response = await axios.get(`/api/user/followings/${user.other._id}`);
                setSearchConversation(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllConversation();
        getALlFollowings();
    }, [user]);

    socket.on("getMessage", ({ message, senderId }) => {
        const index = allConversation?.findIndex(conversation => conversation?.members?.includes(senderId));
        if (index !== -1) {
            // const conversationId = allConversation[index]._id;
            const updatedConversations = [...allConversation];
            const conversationToMove = updatedConversations.splice(index, 1)[0];
            updatedConversations.unshift(conversationToMove);
            setAllConversation(updatedConversations);
        }

    });

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
        messageRef.current?.scrollIntoView();
    }, [messages, messageRef]);

    const sendMessage = async () => {
        if (inputValue.trim() === "") return;
        const message = {
            senderId: user.other._id,
            conversationId: currentChat?._id,
            content: inputValue
        }

        const receiverId = currentChat.members.find(m => m !== user.other._id);
        socket.emit("sendMessage", user.other._id, receiverId, inputValue);

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

    const newConversation = async (userId) => {
        const index = allConversation?.findIndex(conversation => conversation?.members?.includes(userId));
        if (index !== -1) {
            setCurrentChat(allConversation[index]);
            setSearch("");
        } else {
            try {
                const response = await axios.post(`/api/conversation`, {
                    senderId: user.other._id,
                    receiverId: userId
                });
                const updateConv = [...allConversation];
                updateConv.unshift(response.data);
                setAllConversation(updateConv);
                setCurrentChat(response.data);
                setSearch("");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className="messenger">
                <div className="conversations">
                    <div className="conversationsWrapper">
                        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for a friend" className="conversationsInput" />
                        {allConversation.map((conv) => (
                            <div key={conv._id} onClick={() => { setCurrentChat(conv) }}>
                                <Conversation key={conv._id} data={conv} convId={currentChat?._id} />
                            </div>
                        ))}
                        {search.trim() !== "" && (
                            <div className="searchResults">
                                {searchConversation.filter(
                                    conversation => conversation.username.toLowerCase().includes(search.toLocaleLowerCase())
                                ).map(conv => (
                                    <div className="userContainer" key={conv._id} onClick={() => newConversation(conv._id)}>
                                        <img src={conv.profilePicture} alt="" />
                                        <span className="UserName">{conv.username}</span>
                                    </div>
                                ))}
                            </div>
                        )}
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
