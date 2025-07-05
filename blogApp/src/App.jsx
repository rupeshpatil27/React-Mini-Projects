import { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router";

import { useDispatch } from "react-redux";

import { fetchBlogs } from "./features/blog/blogSlice";

import Blog from "./Pages/Blog";
import RootLayout from "./RootLayout";
import BlogDetails from "./Pages/BlogDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Blog />, index: true },
        { path: "/:id", element: <BlogDetails /> },

      ],
    },
  ], {
    future: {
      v7_relativeSplatPath: true,
    },
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
