import "./index.scss";
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import UserListItem from "../../components/UserListItem";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import socket from "../../socket/socketService";


export default function People() {

    const { user, countMessages, messages } = useAuth();
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {

        const getFollowers = async () => {
            try {
                const response = await axios.get(`/api/user/followers/${user.other._id}`);
                setFollowers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        const getFollowings = async () => {
            try {
                const response = await axios.get(`/api/user/followings/${user.other._id}`);
                setFollowings(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        const getSuggestions = async () => {
            try {
                const response = await axios.get(`/api/user/allUser/${user.other._id}`);
                setSuggestions(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getFollowers();
        getFollowings();
        getSuggestions();

    }, [user]);

    useEffect(() => {
        socket.on("getMessage", ({ message, senderId }) => {
            countMessages(messages + 1);
        })
    }, [countMessages, messages]);

    return (
        <div>
            <Navbar />
            <div className="people">
                <Leftbar />
                <div className="peopleContainer">
                    <div className="followersList">
                        <span className="tag">Followers</span>
                        {followers.map(follower => (
                            <div key={follower._id} className="followerContainer">
                                <div className="profileInfo">
                                    <img src={follower.profilePicture} alt="" />
                                    <span className="name">{follower.username}</span>
                                </div>
                                <Link to={`/profile/${follower._id}`}>
                                    <button>View</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="followingsList">
                        <span className="tag">Followings</span>
                        {followings.map(following => (
                            <UserListItem key={following._id} data={following} />
                        ))}
                    </div>
                    <div className="suggestionsList followersList">
                        <span className="tag">Suggestions</span>
                        {suggestions.map(suggestion => (
                            <div key={suggestion._id} className="followerContainer">
                                <div className="profileInfo">
                                    <img src={suggestion.profilePicture} alt="" />
                                    <span className="name">{suggestion.username}</span>
                                </div>
                                <Link to={`/profile/${suggestion._id}`}>
                                    <button>View</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
