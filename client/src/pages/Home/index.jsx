import "./index.scss";
import Shares from "../../components/Shares";
import Post from "../../components/Post";

export default function Home() {
  return (
    <div className="home">
      <Shares />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
