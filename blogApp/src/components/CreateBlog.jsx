import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blog/blogSlice";

function CreateBlog({ onClose }) {
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
  });

  const generateRandomImage = () => {
    const randomID = Math.floor(Math.random() * 500);
    return `https://picsum.photos/id/${randomID}/800/600`;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      id: blogs.length + 1,
      title: form.title,
      body: form.body,
      tags: form.tags.split(",").map((tag) => tag.trim()),
      reactions: {
        likes: Math.floor(Math.random() * 500) + 1,
        dislikes: Math.floor(Math.random() * 300) + 1
      },
      views: Math.floor(Math.random() * 1000) + 1,
      image: generateRandomImage(),
    };

    try {
      dispatch(addBlog(newBlog));
      setForm({ title: "", body: "", tags: "" });
      onClose();
    } catch (err) {
      console.error("Failed to add blog:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Body
          </label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {loading && <div className="text-cyan-500">Adding blog...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Blog
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;