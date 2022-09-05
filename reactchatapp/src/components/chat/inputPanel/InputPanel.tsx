import "./InputPanel.scss";

import Img from "../../../image/img.png";
import Attach from "../../../image/attach.png";

const InputPanel = () => {
  return (
    <div className="inputPanel">
      <input
        type="text"
        placeholder="Send a message..."
        className="inputMessage"
      />
      <div className="send">
        <img src={Img} alt="upload image" />
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={Attach} alt="attach a file image" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default InputPanel;
