import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router";

const BlogCard = ({ data }) => {
  return (
    <div className="row-span-2 md:col-span-2 h-[23rem] md:h-full flex flex-col relative shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

      <div className="flex-1 aspect-square bg-gray-200 overflow-hidden">
        <img src={data.image} alt="Blog Cover" className="w-full m-auto block object-cover flex-shrink-0 flex-grow-0 aspect-square group-hover:scale-[1.2] duration-200" />
      </div>

      <Link to={`/${data.id}`} className="p-5 hover:cursor-pointer">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 hover:text-cyan-500 text-left">{data?.title || "Untitled Blog"}</h2>
          <div className="flex justify-between  text-sm items-center">
            <div className="flex items-center space-x-1 hover:scale-[1.1] duration-200">
              <AiOutlineLike className="text-green-500" />
              <span>{data?.reactions?.likes || 0}</span>
            </div>
            <div className="flex items-center space-x-1 hover:scale-[1.1] duration-200">
              <AiOutlineDislike className="text-red-500" />
              <span>{data?.reactions?.dislikes || 0}</span>
            </div>
            <div className="flex items-center space-x-1 hover:scale-[1.1] duration-200">
              <FiEye className="text-blue-500" />
              <span>{data?.views || 0}</span>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default BlogCard;
