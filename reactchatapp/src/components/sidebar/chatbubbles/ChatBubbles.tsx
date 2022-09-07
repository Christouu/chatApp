import "./ChatBubbles.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ChatBubbles = () => {
  const { currentUser } = useContext(AuthContext);

  const [chats, setChats] = useState([]);

  const handleSelect = (chat: any) => {};

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        //@ts-ignore
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(chats);

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.dispalyName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatBubbles;
