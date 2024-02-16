import "./index.scss";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "../../api/axios";
import socket from "../../socket/socketService";


export default function Conversation({ data, convId }) {

    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const [onlineAccounts, setOnlineAccounts] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [isNewMsg, setIsNewMsg] = useState(false);

    useEffect(() => {
        socket.on("onlineUsers", (onlineUsers) => {
            setOnlineAccounts(onlineUsers);
        });
    }, []);

    useEffect(() => {
        const friendId = data.members.find((m => m !== user.other._id));
        if (onlineAccounts.includes(friendId)) {
            setIsOnline(true);
        }
    }, [onlineAccounts, data, user]);

    useEffect(() => {
        const friendId = data.members.find((m => m !== user.other._id));
        const getUser = async () => {
            try {
                const response = await axios.get(`api/user/${friendId}`);
                setUserInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [data, user]);

    useEffect(() => {
        if (convId === data._id) {
            setIsNewMsg(false);
        }
    }, [convId, data, isNewMsg]);

    socket.on("getMessage", ({ message, senderId }) => {
        const friendId = data.members.find((m => m !== user.other._id));
        if (friendId === senderId) {
            setIsNewMsg(true);
        } else {
            setIsNewMsg(false);
        }
    })

    return (
        <div className={convId === data._id ? "conversation clicked" : "conversation"}>
            <div className="userInfo">
                <img src={userInfo.profilePicture} alt="user profile" />
                <span className={isNewMsg ? "bold" : "noBold"}>{userInfo.username}</span>
            </div>
            <div className="userStatus">
                {isOnline && (<div className="onlineDot" />)}
                <MoreVertIcon />
            </div>
        </div>
    )
}
