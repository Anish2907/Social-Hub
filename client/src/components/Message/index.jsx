import "./index.scss";
import moment from "moment";


export default function Message({ own, data }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageContainer">
                <span className="messageText">{data.content}</span>
                <span className="messageTime">{moment(data.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}
