import "./index.scss";
import Shares from "../../components/Shares";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import socket from "../../socket/socketService";

export default function Home() {

  const { user, countMessages, messages } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    socket.emit("newUser", user.other._id);
  }, [user]);

  useEffect(() => {
    socket.on("getMessage", ({ message, senderId }) => {
      countMessages(messages + 1);
    })
  }, [countMessages, messages]);

  useEffect(() => {
    const getTimelinePosts = async () => {
      try {
        const response = await axios.get(`/api/posts/timeline/${user.other._id}`);
        setPosts(response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.log(error);
      }
    }
    getTimelinePosts();
  }, [user.other._id])


  return (
    <div className="home">
      <Shares />
      {posts.map(post => (
        <Post
          key={post._id}
          info={post}
          isProfile={false}
        />
      ))}
    </div>
  );
}
