import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import ErrorValification from "../components/ErrorValification";

const Comment = () => {
  const navigate = useNavigate();
  const { postid, commentid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts/" + postid + "/comments/" + commentid, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const submittingData = { ...data, content: e.target.content.value };
    const res = await fetch(
      "http://localhost:3000/posts/" + postid + "/comments/" + commentid,
      {
        mode: "cors",
        method: "put",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittingData),
      },
    );
    try {
      const json = await res.json();
      if (json.errors) {
        setError(json.errors);
      }
    } catch {
      navigate("/posts/" + postid);
    }
  };
  return (
    <>
      <h1>Update comment</h1>
      {data && (
        <>
          <CommentForm
            data={data}
            setData={setData}
            onSubmit={onSubmit}
            deleteBtn="true"
          />
          <ErrorValification error={error} />
        </>
      )}
    </>
  );
};

export default Comment;
