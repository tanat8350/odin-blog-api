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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        {user ? (
          <>
            <p>{user.username}</p>
            <Link className="logout" href="/logout">
              Logout
            </Link>
          </>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="outlet">
        <Outlet context={[user, setUser]}></Outlet>
      </div>
    </>
  );
};

export default Root;
