import { useEffect, useState } from "react";
import PostCards from "../components/PostCards";

const AllPosts = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <h1>All Posts</h1>
      {data ? (
        <PostCards data={data} author="true" />
      ) : (
        <p>Be the first one to create post</p>
      )}
    </>
  );
};

export default AllPosts;
