import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ChatContext } from "../../../../context/UserContext";
import "./Message.scss";

const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const chatRef = useRef();

  useEffect(() => {
    //@ts-ignore
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      //@ts-ignore
      ref={chatRef}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
