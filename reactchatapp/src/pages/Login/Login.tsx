import "./Login.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">Kristou Chat</h1>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>
          You do have an account ? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
