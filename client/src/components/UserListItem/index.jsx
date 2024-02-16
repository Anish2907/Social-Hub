import "./index.scss";
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


export default function UserListItem({ data }) {

    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(true);
    const followUser = async () => {
        try {
            setIsFollowing(prev => !prev);
            await axios.put(`/api/user/${data._id}/follow`, { userId: user.other._id });
        } catch (error) {
            console.log(error);
            setIsFollowing(prev => !prev);
        }
    }

    return (
        <div className="followingContainer">
            <div className="profileInfo">
                <img src={data.profilePicture} alt="" />
                <span className="name">{data.username}</span>
            </div>
            <div className="btns">
                <button className="followBtn" onClick={followUser}>{isFollowing ? "Unfollow" : "Follow"}</button>
                <Link to={`/profile/${data._id}`}>
                    <button className="viewBtn">View</button>
                </Link>
            </div>
        </div>
    )
}
