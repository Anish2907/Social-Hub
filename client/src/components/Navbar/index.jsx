import "./index.scss";
import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import {
  HomeOutlined,
  GridViewOutlined,
  SearchOutlined,
  GroupOutlined,
  MessageOutlined
} from '@mui/icons-material/';


export default function Navbar() {

  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 210;

      if (window.scrollY > scrollThreshold && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY <= scrollThreshold && scrolled) {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrolled]);

  return (
    <div className={scrolled ? "navbar" : "navbar scrolled"}>
      <div className="left">
        <NavLink to="/" style={{ textDecoration: "none", margin: "none", padding: "none" }}>
          <span>Social Hub</span>
        </NavLink>
        <NavLink to="/" activeClassName="active" style={{ color: "black" }}>
          <HomeOutlined className="navIcon" />
        </NavLink>
        <GridViewOutlined className="navIcon" />
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <NavLink to="/people" activeClassName="active" style={{ color: "black" }}>
          <GroupOutlined className="navIcon" />
        </NavLink>
        <NavLink to="/messages" activeClassName="active" style={{ color: "black" }}>
          <MessageOutlined className="navIcon" />
        </NavLink>
        <div className="user">
          <NavLink to={`/profile/${user?.other?._id}`} activeClassName="active">
            <img src={user?.other?.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="user profile" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
