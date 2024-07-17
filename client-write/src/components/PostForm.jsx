import { useNavigate } from "react-router-dom";
import ErrorValification from "./ErrorValification";
import { Editor } from "@tinymce/tinymce-react";

const PostForm = ({
  title,
  button,
  data,
  setData,
  editorRef,
  onSubmit,
  error,
  deleteId,
}) => {
  const navigate = useNavigate();
  const encodeHtml = (str) => {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&quot;/g, '"')
      .replace(/&#x2F;/g, "/");
  };

  const clickDelete = async () => {
    await fetch("http://localhost:3000/posts/" + deleteId, {
      mode: "cors",
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    navigate("/");
  };
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={data ? data.title : ""}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
        </div>
        <div>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={
              data && data.content
                ? encodeHtml(data.content)
                : "<p>new post</p>"
            }
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              skin: "oxide-dark",
              content_css: "dark",
            }}
          />
        </div>
        <div>
          <label htmlFor="isPublished">Published: </label>
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            checked={data ? data.isPublished : false}
            onChange={(e) => {
              setData({ ...data, isPublished: e.target.checked });
            }}
          />
        </div>
        <button className="button" type="submit">
          {button}
        </button>
        {deleteId && (
          <button className="button deleteButton" onClick={clickDelete}>
            Delete
          </button>
        )}
      </form>
      <ErrorValification error={error} />
    </>
  );
};

export default PostForm;
