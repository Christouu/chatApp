import "./InputPanel.scss";

import Img from "../../../image/img.png";
import Attach from "../../../image/attach.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/UserContext";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
const InputPanel = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                text,
                img: downloadURL,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });

            setText("");
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });

      setText("");
    }
  };

  return (
    <div className="inputPanel">
      <input
        type="text"
        placeholder="Send a message..."
        className="inputMessage"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Img} alt="upload image" />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e: any) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Attach} alt="attach a file image" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default InputPanel;
