import { FcLike } from "react-icons/fc";
import "./index.css";

const ChatItem = (props) => {
  const { value, onIncrementCount } = props;
  const { message, likesCount, id, person, color } = value;

  const like = () => onIncrementCount(id);

  return (
    <div className="single-message-container">
      <p className="log" style={{ backgroundColor: color }}>
        {person[0]}
      </p>
      <div className="cols">
        <p style={{ color: color }}>{person}</p>
        <p className="mess">{message}</p>
      </div>
      <div className="rows2">
        <FcLike size={35} className="pointer" onClick={like} />
        <p className="mess2">{likesCount}</p>
      </div>
    </div>
  );
};

export default ChatItem;
