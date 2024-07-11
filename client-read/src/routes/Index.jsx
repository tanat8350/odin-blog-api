import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
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
      <h1>Index</h1>
      {data &&
        data.map((post) => {
          return (
            <div key={post._id}>
              <h2>
                <a key={`${post._id}_title`} href={`posts/${post._id}`}>
                  {post.title}
                </a>
              </h2>
              <p key={`${post._id}_content`}>{post.content}</p>
              <p key={`${post._id}_timestamp`}>{post.timestamp}</p>
              <Link to={`users/${post.author._id}`}>
                {post.author.username}
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Index;
