import "./index.scss";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlaceIcon from '@mui/icons-material/Place';
import LabelIcon from '@mui/icons-material/Label';

export default function Shares() {
  return (
    <div className="shares">
        <div className="container">
            <div className="top">
                <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile" />
                <input type="text" placeholder="What's in your mind?" />
            </div>
            <hr/>
            <div className="bottom">
                <div className="left">
                    <div className="item">
                        <PermMediaIcon htmlColor="orange"/>
                        <span>Photo</span>
                    </div>
                    <div className="item">
                        <LabelIcon htmlColor="blue"/>
                        <span>Tag</span>
                    </div>
                    <div className="item">
                        <PlaceIcon htmlColor="green"/>
                        <span>Location</span>
                    </div>
                    <div className="item">
                        <EmojiEmotionsIcon htmlColor="gold"/>
                        <span>Feelings</span>
                    </div>
                </div>
                <button>Share</button>
            </div>
        </div>
    </div>
  )
}
