import "./index.scss";
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import {
  HomeOutlined,
  GridViewOutlined,
  SearchOutlined,
  GroupOutlined,
  NotificationsOutlined,
  MessageOutlined
} from '@mui/icons-material/';


export default function Navbar() {

  const { user } = useAuth();

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Hub</span>
        </Link>
        <HomeOutlined className="navIcon" />
        <GridViewOutlined className="navIcon" />
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <GroupOutlined className="navIcon" />
        <MessageOutlined className="navIcon" />
        <NotificationsOutlined className="navIcon" />
        <div className="user">
          <Link to={`/profile/${user?.other?._id}`}>
            <img src={user?.other?.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="user profile" />
          </Link>
        </div>
      </div>
    </div>
  )
}
