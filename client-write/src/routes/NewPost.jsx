import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import PostForm from "../components/PostForm";
const NewPost = () => {
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/posts/", {
      mode: "cors",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, author: user.id }),
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
    <PostForm
      title="Create post"
      button="Create"
      data={data}
      setData={setData}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default NewPost;
