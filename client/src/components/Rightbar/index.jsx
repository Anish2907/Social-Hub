import "./index.scss";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Rightbar() {

  const { user } = useAuth();
  const [followUsers, setFollowUsers] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get(`/api/user/allUser/${user.other._id}`);
        setFollowUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUser();
  }, [user.other._id])

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
        <div className="item activities">
          <span>Latest Activities</span>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <p>
              <span>Jhon Doe</span> Changed their cover picture
            </p>
          </div>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <p>
              <span>Jhon Doe</span> Changed their cover picture
            </p>
          </div>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <p>
              <span>Jhon Doe</span> Changed their cover picture
            </p>
          </div>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <p>
              <span>Jhon Doe</span> Changed their cover picture
            </p>
          </div>
        </div>
        <div className="item onlineList">
          <span>Online Friends</span>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <div className="online" />
            <span>Jhon Doe</span>
          </div>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <div className="online" />
            <span>Jhon Doe</span>
          </div>
          <div className="userInfo">
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
            <div className="online" />
            <span>Jhon Doe</span>
          </div>
        </div>
      </div>
    </div>
  )
}
