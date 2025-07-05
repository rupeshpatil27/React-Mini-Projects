import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchBlogDetails } from '../features/blog/blogSlice';

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (id) dispatch(fetchBlogDetails(id));
  }, [id, dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!blog) return <div className="text-center text-gray-500">No post found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          {blog.body}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span>👍</span>
            <span>Likes: {blog.reactions?.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👎</span>
            <span>Dislikes: {blog.reactions?.dislikes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👁️</span>
            <span>Views: {blog.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails