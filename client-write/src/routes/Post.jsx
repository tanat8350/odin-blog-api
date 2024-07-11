import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

const Post = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + id, { mode: "cors" })
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
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/posts/" + id, {
      mode: "cors",
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      {data && (
        <PostForm
          title="Post update"
          button="Update"
          data={data}
          setData={setData}
          onSubmit={onSubmit}
          error={error}
          deleteId={id}
        />
      )}
    </>
  );
};

export default Post;
