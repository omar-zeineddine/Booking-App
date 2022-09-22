import "./login.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [creds, setCreds] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInupt"
        />
        <input
          type="password"
          placeholder="passowrd"
          id="passowrd"
          onChange={handleChange}
          className="lInupt"
        />
        <button className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
