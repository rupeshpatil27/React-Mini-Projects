import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { AiOutlineClose } from 'react-icons/ai';

const SearchBox = ({ onClose }) => {
    const { blogs } = useSelector((state) => state.blog);
    const [search, setSearch] = useState("");

    const filteredBlogs = search.trim()
        ? blogs.filter(blog =>
            blog.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full md:w-[70rem] h-full md:h-[35rem] relative flex flex-col">
                <div className='w-full p-6 flex items-center justify-between'>
                    {/* Input */}
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-2 py-2 bg-neutral-300 w-[50rem] rounded-md"
                    />

                    {/* Close Button */}
                    <AiOutlineClose onClick={() => { setSearch(""); onClose(); }} className="text-red-500 size-10 cursor-pointer" />
                </div>

                {/* Filtered Results */}
                <div className="mt-4 grid grid-cols-8 md:auto-rows-[10rem] gap-2 py-2 px-1 overflow-auto">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((item, index) => (
                            <BlogCard key={item.id || index} data={item} />
                        ))
                    ) : (
                        <p className="text-neutral-500 text-center">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
