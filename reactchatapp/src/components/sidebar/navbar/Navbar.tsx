import "./Navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Kristou chat</span>
      <div className="user">
        <img
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltb7bcb49121e79c66/626137d3ceb10b47dfaba6b2/eth.jpg"
          alt="avatar image"
        />
        <span>Erik ten hag</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
