import "./Search.scss";
import { useState } from "react";
import People from "../people/People";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //@ts-ignore
        setUser(doc.data());
      });
    } catch (error) {
      //@ts-ignore
      setError(error);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {error && <span>User not found!</span>}
      <People user={user} setUser={setUser} setUsername={setUsername} />
    </div>
  );
};

export default Search;
