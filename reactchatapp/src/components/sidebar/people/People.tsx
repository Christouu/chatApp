import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import "./People.scss";

const People = ({ user, setUser, setUsername }: any) => {
  const { currentUser } = useContext(AuthContext);

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            dispalyName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(), //dont use Date.now(). serverTImestamps calculates time zones
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            dispalyName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(), //dont use Date.now(). serverTImestamps calculates time zones
        });
      }
    } catch (error) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="people">
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user avatar" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p>brato arsenla sa mega slabi plz vzemi me pri teb</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
