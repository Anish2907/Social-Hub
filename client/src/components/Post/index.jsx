import "./index.scss";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from "moment";

export default function Post({ info, isProfile }) {

  const [userinfo, setUserInfo] = useState({});
  const [likes, setLikes] = useState(info.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setIsLiked(info.likes.includes(user.other._id));
  }, [info.likes, user.other._id])

  useEffect(() => {
    setShowDel(info.userId === user.other._id && isProfile);
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/${info.userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [info.userId, user.other._id, isProfile])

  const likePost = async () => {
    try {
      await axios.put(`/api/posts/${info._id}/like`, { userId: user.other._id });
    } catch (error) {
      console.log(error)
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(prev => !prev);
  }

  const deletePost = async () => {
    try {
      await axiosPrivate.delete(`/api/posts/${info._id}`);
      setOpenDel(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setOpenDel(false);
    }
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${info.userId}`}>
              <img src={userinfo?.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="user profile" />
            </Link>
            <div className="details">
              <span>{userinfo.username}</span>
              <span className="date">{moment(info.createdAt).fromNow()}</span>
            </div>
          </div>
          <div>
            {showDel && (
              <DeleteOutlineOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenDel(true)}
              />
            )}
            <MoreVertIcon />
          </div>
        </div>
        <div className="content">
          <p>{info.desc}</p>
          <img src={info?.imgURL} alt="" />
        </div>
        <div className="interaction">
          <div className="item">
            <FavoriteBorderIcon onClick={likePost} htmlColor={isLiked ? "red" : null} style={{ cursor: "pointer" }} />
            <span>{likes} Likes</span>
          </div>
          <div className="item">
            <CommentOutlinedIcon />
            <span>Comments</span>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            <span>Share</span>
          </div>
        </div>
        {openDel && (
          <div className="deleteModal">
            <span>Are you sure to delete this post ?</span>
            <div className="btns">
              <button onClick={() => setOpenDel(false)} className="cancelBtn">Cancel</button>
              <button onClick={deletePost} className="deleteBtn">Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
