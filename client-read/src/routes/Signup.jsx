import { useNavigate } from "react-router-dom";
import ErrorValification from "../components/ErrorValification";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/signup", {
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
    try {
      const json = await res.json();
      if (json.errors) {
        setError(json.errors);
      }
    } catch {
      navigate("/");
    }
  };
  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div className="nobotmargin">
          <label htmlFor="username">Username </label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input type="password" name="password" id="password" />
        </div>
        <button className="button" type="submit">
          Sign up
        </button>
      </form>
      <ErrorValification error={error} />
    </>
  );
};

export default Signup;
