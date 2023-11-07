import "./index.scss";
import {Link} from "react-router-dom"

import {
  HomeOutlined,
  GridViewOutlined,
  SearchOutlined,
  GroupOutlined,
  NotificationsOutlined,
  MessageOutlined
} from '@mui/icons-material/';


export default function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span>Social Hub</span>
        </Link>
        <HomeOutlined className="navIcon"/>
        <GridViewOutlined className="navIcon"/>
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <GroupOutlined className="navIcon"/>
        <MessageOutlined className="navIcon"/>
        <NotificationsOutlined className="navIcon"/>
        <div className="user">
          <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
        </div>
      </div>
    </div>
  )
}
