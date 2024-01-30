import "./index.scss";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PlaceIcon from '@mui/icons-material/Place';
import LabelIcon from '@mui/icons-material/Label';
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "../../api/axios";

export default function Shares() {

    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const name = user.other.username.split(" ")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (desc === "" && !file) return;
        setIsPosting(true);

        const newPost = {
            userId: user.other._id,
            desc
        }
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("name", file.name);
            try {
                const response = await axios.post("/api/cloudinary/upload", data);
                newPost.imgURL = response.data.url;
                newPost.imgPublicId = response.data.publicId;
            } catch (error) {
                console.log(error)
            }
        }

        try {
            await axios.post("/api/posts", newPost);
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            setIsPosting(false);
        }
    }

    return (
        <div className="shares">
            <div className="container">
                <div className="top">
                    <img src={user?.other?.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt="user profile" />
                    <input
                        type="text"
                        placeholder={`What's in your mind ${name}`}
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value) }}
                    />
                </div>
                <hr />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bottom">
                    <div className="left">
                        <label htmlFor="file" className="item">
                            <PermMediaIcon htmlColor="orange" className="shareIcons" />
                            <span>Photo</span>
                            <input
                                style={{ display: "none" }}
                                type="file" id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => { setFile(e.target.files[0]) }}
                            />
                        </label>
                        <div className="item">
                            <LabelIcon htmlColor="blue" className="shareIcons" />
                            <span>Tag</span>
                        </div>
                        <div className="item">
                            <PlaceIcon htmlColor="green" className="shareIcons" />
                            <span>Location</span>
                        </div>
                    </div>
                    <div className="right">
                        {file && (<button className="cancelBtn" onClick={() => { setFile(null) }}>Cancel</button>)}
                        <button type="submit" disabled={isPosting} style={{ cursor: isPosting ? "not-allowed" : "pointer" }} >Share</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
