import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Root = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      {user ? (
        <>
          <p>{user.username}</p>
          <a href="/logout">Logout</a>
        </>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      )}
      <div>
        <Outlet context={[user, setUser]}></Outlet>
      </div>
    </>
  );
};

export default Root;
