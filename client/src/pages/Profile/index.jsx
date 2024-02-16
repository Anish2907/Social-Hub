import "./index.scss";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SessionExpired } from "../../context/AuthAction";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import socket from "../../socket/socketService";

export default function Profile() {

  const { id } = useParams()
  const { user, dispatch, countMessages, messages } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
  const [openCoverUpdate, setOpenCoverUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [twitter, setTwitter] = useState("");


  useEffect(() => {
    socket.emit("newUser", user.other._id);
  }, [user]);

  useEffect(() => {
    socket.on("getMessage", ({ message, senderId }) => {
      countMessages(messages + 1);
    })
  }, [countMessages, messages]);

  useEffect(() => {

    if (id === user.other._id) {
      setIsUser(true);
    }

    const getUserPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/profile/${id}`);
        setPosts(response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.log(error);
      }
    }
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUserInfo(response.data);
        setIsFollowing(response.data.followers.includes(user.other._id));
      } catch (error) {
        console.log(error);
      }
    }

    getUserInfo();
    getUserPosts();

  }, [id, user.other._id, user.other.followings])

  const followUser = async () => {
    try {
      setIsFollowing((prev) => !prev);
      await axios.put(`/api/user/${id}/follow`, { userId: user.other._id });
    } catch (error) {
      console.log(error);
      setIsFollowing((prev) => !prev);
    }
  }

  const signOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      dispatch(SessionExpired(id));
    } catch (error) {
      console.log(error);
    }
  }

  const updateUserInfo = async () => {
    if (name.trim() === "" && city.trim() === "" && country.trim() === "" && fb.trim() === "" && insta.trim() === "" && twitter.trim() === "") return;
    const updateInfo = {};
    if (name !== "") { updateInfo.username = name };
    if (city !== "") { updateInfo.city = city };
    if (country !== "") { updateInfo.from = country };
    if (fb !== "") { updateInfo.fbUrl = fb };
    if (insta !== "") { updateInfo.instaUrl = insta };
    if (twitter !== "") { updateInfo.twitterUrl = twitter };
    try {
      await axiosPrivate.put(`/api/user/${user.other._id}`, updateInfo);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const updateCoverPic = async (e) => {
    e.preventDefault();
    if (coverFile) {
      setIsPosting(true);
      const coverUpdate = { coverPicture: "", coverPicturePublicId: "" };
      const data = new FormData();
      data.append("file", coverFile);
      data.append("name", coverFile.name);

      try {
        const response = await axios.post("/api/cloudinary/upload", data);
        coverUpdate.coverPicture = response.data.url;
        coverUpdate.coverPicturePublicId = response.data.publicId;
      } catch (error) {
        console.log(error);
      }

      try {
        await axiosPrivate.put(`/api/user/${user.other._id}`, coverUpdate);
        window.location.reload();
      } catch (error) {
        console.log(error);
      } finally {
        setIsPosting(false);
      }
    } else return;
  }

  const updateProfilePic = async (e) => {
    e.preventDefault();
    if (profileFile) {
      setIsPosting(true);
      const profileUpdate = { profilePicture: "", profilePicturePublicId: "" };
      const data = new FormData();
      data.append("file", profileFile);
      data.append("name", profileFile.name);

      try {
        const response = await axios.post("/api/cloudinary/upload", data);
        profileUpdate.profilePicture = response.data.url;
        profileUpdate.profilePicturePublicId = response.data.publicId;
      } catch (error) {
        console.log(error);
      }

      try {
        await axiosPrivate.put(`/api/user/${user.other._id}`, profileUpdate);
        window.location.reload();
      } catch (error) {
        console.log(error);
      } finally {
        setIsPosting(false);
      }
    } else return;
  }

  const deleteAccount = async () => {
    try {
      await axiosPrivate.delete(`/api/user/${user.other._id}`);
      dispatch(SessionExpired(id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile">
      <div className="images">
        <div className="coverContainer">
          <img src={userInfo.coverPicture || "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Circle-Simple-Background-Image-1.jpg"} alt="" className="cover" />
          {isUser && <ModeEditOutlineOutlinedIcon onClick={() => setOpenCoverUpdate(prev => !prev)} className="editIcon" />}
        </div>
        <div className="profilePicContainer">
          <img src={userInfo.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="" className="profilePic" />
          {isUser && <ModeEditOutlineOutlinedIcon onClick={() => setOpenProfileUpdate(prev => !prev)} className="editIcon" />}
        </div>
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href={userInfo?.fbUrl || "https://www.facebook.com"} target="blank">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href={userInfo?.instaUrl || "https://www.instagram.com"} target="blank">
              <InstagramIcon fontSize="large" />
            </a>
            <a href={userInfo?.twitterUrl || "https://www.twitter.com"} target="blank">
              <TwitterIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span className="name">{userInfo?.username || "Username"}</span>
            <div className="place">
              <PlaceIcon />
              <span>{`${userInfo?.city || "City"} , ${userInfo?.from || "Country"}`}</span>
            </div>
            {isUser
              ? <button onClick={() => setOpenUpdate(true)}>Update</button>
              : <button onClick={followUser}>{isFollowing ? "Unfollow" : "Follow"}</button>
            }
            {isUser && (
              <div className="profileBtn">
                <button className="signOut" onClick={signOut}>Sign Out</button>
                <button className="delAcc" onClick={() => setOpenDelete(true)}>Delete</button>
              </div>
            )}
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>
        {openUpdate && (
          <div className="updateModal">
            <div className="container">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="New Name" className="name" />
              <div className="place">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="New City" className="city" />
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="New Country" className="country" />
              </div>
              <div className="otherMedia">
                <input type="text" value={fb} onChange={(e) => setFb(e.target.value)} placeholder="Facebook URL" className="facebook" />
                <input type="text" value={insta} onChange={(e) => setInsta(e.target.value)} placeholder="Instagram URL" className="insta" />
                <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter URL" className="twitter" />
              </div>
              <div className="updateBtn">
                <button onClick={() => setOpenUpdate(false)} className="cancel">Cancel</button>
                <button onClick={updateUserInfo} className="update">Update</button>
              </div>
            </div>
          </div>
        )}
        {openCoverUpdate && (
          <form className="updateCover" onSubmit={updateCoverPic}>
            <div className="container">
              <div className="coverInput">
                <label htmlFor="coverPic">Choose cover picture : </label>
                <input
                  type="file"
                  id="coverPic"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => { setCoverFile(e.target.files[0]) }}
                />
              </div>
              <div className="btn">
                <button className="cancel" onClick={() => { setOpenCoverUpdate(false); setCoverFile(null); }}>Cancel</button>
                <button className="update" type="submit" disabled={isPosting} style={{ cursor: isPosting ? "not-allowed" : "pointer" }}>Update</button>
              </div>
            </div>
          </form>
        )}
        {openProfileUpdate && (
          <form className="updateCover" onSubmit={updateProfilePic}>
            <div className="container">
              <div className="coverInput">
                <label htmlFor="profilePic">Choose profile picture : </label>
                <input
                  type="file"
                  id="profilePic"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => { setProfileFile(e.target.files[0]) }}
                />
              </div>
              <div className="btn">
                <button className="cancel" onClick={() => { setOpenProfileUpdate(false); setProfileFile(null); }}>Cancel</button>
                <button className="update" type="submit" disabled={isPosting} style={{ cursor: isPosting ? "not-allowed" : "pointer" }}>Update</button>
              </div>
            </div>
          </form>
        )}
      </div>
      {posts.map(post => (
        <Post
          key={post._id}
          info={post}
          isProfile={true}
        />
      ))}
      {openDelete && (
        <div className="deleteModal">
          <div className="container">
            <span>Do you want to delete your account ?</span>
            <div className="delBtn">
              <button onClick={() => setOpenDelete(false)}>Cancel</button>
              <button onClick={deleteAccount} className="del">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}