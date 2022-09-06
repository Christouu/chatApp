import "./Navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  return (
    <div className="navbar">
      <span className="logo">Kristou chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="avatar image" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
