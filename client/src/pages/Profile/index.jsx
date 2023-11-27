import "./index.scss";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Post from "../../components/Post";

export default function Profile() {
  return (
    <div className="profile">
      <div className="images">
        <img src="https://images.cnbctv18.com/wp-content/uploads/2023/09/red-panda-780x438.jpg" alt="" className="cover" />
        <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="https://www.facebook.com/">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="https://www.facebook.com/">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://www.facebook.com/">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://www.facebook.com/">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span className="name">Jane Doe</span>
            <div className="place">
              <PlaceIcon />
              <span>India</span>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}