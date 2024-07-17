import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import ErrorValification from "../components/ErrorValification";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useOutletContext();
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
      mode: "cors",
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    const savedData = {
      username: data.user.username,
      id: data.user._id,
    };
    setUser(savedData);
    localStorage.setItem("user", JSON.stringify(savedData));
    localStorage.setItem("accessToken", data.token);
    navigate("/");
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="nobotmargin">
          <label htmlFor="username">Username </label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input type="password" name="password" id="password" />
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <ErrorValification error={error} />
    </>
  );
};

export default Login;
