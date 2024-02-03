import "./index.scss";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "../../api/axios";


export default function Conversation({ data, convId }) {

    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});

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
    }, [data.members, user.other._id]);

    return (
        <div className={convId === data._id ? "conversation clicked" : "conversation"}>
            <div className="userInfo">
                <img src={userInfo.profilePicture} alt="user profile" />
                <span>{userInfo.username}</span>
            </div>
            <MoreVertIcon />
        </div>
    )
}
