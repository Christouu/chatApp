import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltb7bcb49121e79c66/626137d3ceb10b47dfaba6b2/eth.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltb7bcb49121e79c66/626137d3ceb10b47dfaba6b2/eth.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Message;
