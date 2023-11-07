import "./index.scss";
import {Link} from "react-router-dom"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export default function Post() {
  return (
    <div className="post">
        <div className="container">
            <div className="user">
              <div className="userInfo">
                <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
                <div className="details">
                  <Link style={{textDecoration:"none", color:"inherit"}}>
                    <span>Jhon Doe</span>
                  </Link>
                  <span className="date">1 min ago</span>
                </div>
              </div>
              <MoreVertIcon />
            </div>
            <div className="content">
              <p>Post description</p>
              <img src="https://images.cnbctv18.com/wp-content/uploads/2023/09/red-panda-780x438.jpg" alt="" />
            </div>
            <div className="interaction">
              <div className="item">
                <FavoriteBorderIcon />
                <span>12 Likes</span>
              </div>
              <div className="item">
                <CommentOutlinedIcon />
                <span>12 Comments</span>
              </div>
              <div className="item">
                <ShareOutlinedIcon />
                <span>Share</span>
              </div>
            </div>
        </div>
    </div>
  )
} 
