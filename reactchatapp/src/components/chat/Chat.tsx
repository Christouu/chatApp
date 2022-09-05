import "./Chat.scss";

import Cam from "../../image/cam.png";
import Add from "../../image/add.png";
import More from "../../image/more.png";
import Messages from "./messages/Messages";
import InputPanel from "./inputPanel/InputPanel";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Erik</span>
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
