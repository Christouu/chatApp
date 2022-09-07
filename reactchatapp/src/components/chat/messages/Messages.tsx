import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/UserContext";
import { db } from "../../../firebase";
import Message from "./message/Message";
import "./Messages.scss";

const Messages = () => {
  const { data } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      if (doc.exists()) {
        //@ts-ignore
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unsub();
    };
  }, [data.chatID]);

  return (
    <div className="messages">
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
