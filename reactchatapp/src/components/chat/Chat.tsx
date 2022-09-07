import "./Chat.scss";

import Cam from "../../image/cam.png";
import Add from "../../image/add.png";
import More from "../../image/more.png";
import Messages from "./messages/Messages";
import InputPanel from "./inputPanel/InputPanel";
import { useContext } from "react";
import { ChatContext } from "../../context/UserContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.dispalyName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="camera icon" />
          <img src={Add} alt="Add icon" />
          <img src={More} alt="More info icon" />
        </div>
      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};

export default Chat;
