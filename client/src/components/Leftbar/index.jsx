import "./index.scss";
import {
  AccountCircle,
  People,
  Storefront,
  Movie,
  Star,
  Event,
  SportsEsports,
  Collections,
  OndemandVideo,
  Email,
  MonetizationOn,
  CastForEducation,
  Newspaper
} from "@mui/icons-material"

 
export default function Leftbar() {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <AccountCircle htmlColor="blue"/>
            <span>User</span>
          </div>
          <div className="item">
            <People htmlColor="skyBlue"/>
            <span>Groups</span>
          </div>
          <div className="item">
            <Storefront htmlColor="green"/>
            <span>Market Place</span>
          </div>
          <div className="item">
            <Movie htmlColor="red"/>
            <span>Watch</span>
          </div>
          <div className="item">
            <Star htmlColor="gold"/>
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
              <Event htmlColor="hotpink"/>
              <span>Events</span>
          </div>
          <div className="item">
              <SportsEsports htmlColor="green"/>
              <span>Gamming</span>
          </div>
          <div className="item">
              <Collections htmlColor="orange"/>
              <span>Gallery</span>
          </div>
          <div className="item">
              <OndemandVideo htmlColor="red"/>
              <span>Videos</span>
          </div>
          <div className="item">
              <Email htmlColor="blue"/>
              <span>Messages</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <MonetizationOn htmlColor="gold"/>
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <CastForEducation htmlColor="green"/>
            <span>Courses</span>
          </div>
          <div className="item">
            <Newspaper htmlColor="blue"/>
            <span>News</span>
          </div>
        </div>
      </div>
    </div>
  )
}
