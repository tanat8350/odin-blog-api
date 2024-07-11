import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const User = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:3000/users/" + id, { mode: "cors" })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <div key={item._id}>
              <h2>
                <Link to={`/posts/${item._id}`}>{item.title}</Link>
              </h2>
              <p>{item.content}</p>
              <p>{item.timestamp}</p>
            </div>
          );
        })}
    </>
  );
};

export default User;
