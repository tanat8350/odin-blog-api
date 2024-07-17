import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import removeHtmlTag from "../../utils/removeHtmlTags";
const User = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:3000/users/published/" + id, { mode: "cors" })
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
            <div className="card" key={item._id}>
              <h2>
                <Link to={`/posts/${item._id}`}>{item.title}</Link>
              </h2>
              <p>{removeHtmlTag(item.content)}</p>
              <p>{new Date(item.timestamp).toLocaleString()}</p>
            </div>
          );
        })}
    </>
  );
};

export default User;
