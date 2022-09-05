import "./Login.scss";
import Add from "../../image/addAvatar.png";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">Kristou Chat</h1>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>You do have an account ? Register</p>
      </div>
    </div>
  );
};

export default Login;
