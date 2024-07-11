import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Index from "./routes/Index.jsx";
import Login from "./routes/Login.jsx";
import Logout from "./routes/Logout.jsx";
import Signup from "./routes/Signup.jsx";
import Post from "./routes/Post.jsx";
import User from "./routes/User.jsx";
import Comment from "./routes/Comment.jsx";

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
        path: "posts/:id",
        element: <Post />,
      },
      {
        path: "users/:id",
        element: <User />,
      },
      {
        path: "posts/:postid/comments/:commentid",
        element: <Comment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
