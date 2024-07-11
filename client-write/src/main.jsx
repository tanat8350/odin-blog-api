import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root.jsx";
import Index from "./routes/Index.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Post from "./routes/Post.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logout from "./routes/Logout.jsx";
import NewPost from "./routes/NewPost.jsx";
import AllPosts from "./routes/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "new-post",
        element: <NewPost />,
      },
      {
        path: "posts",
        element: <AllPosts />,
      },
      {
        path: "posts/:id",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
