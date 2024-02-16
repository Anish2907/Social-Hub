import "./index.scss";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import socket from "../../socket/socketService";

export default function Rightbar() {

  const { user } = useAuth();
  const [followUsers, setFollowUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get(`/api/user/allUser/${user.other._id}`);
        setFollowUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    const getAllFollowers = async () => {
      try {
        const response = await axios.get(`/api/user/followers/${user.other._id}`);
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllUser();
    getAllFollowers();
  }, [user])

  useEffect(() => {
    socket.on("onlineUsers", (onlineUsers) => {
      setOnlineFriends(onlineUsers);
    });
  }, []);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item suggestions">
          <span>Suggestions For You</span>
          {followUsers.map(user => (
            <div className="userInfo suggestionList" key={user._id}>
              <div className="user">
                <img src={user.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="user profile" />
                <span>{user.username}</span>
              </div>
              <Link to={`/profile/${user._id}`}>
                <button>View</button>
              </Link>
            </div>
          ))}
        </div>
        <div className="item onlineList">
          <span>Online Friends</span>
          {followers.map(follower => (
            <div key={follower._id} className={onlineFriends.includes(follower._id) ? "userInfo" : "offline"}>
              <img src={follower.profilePicture} alt="user profile" />
              <div className="online" />
              <span>{follower.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
