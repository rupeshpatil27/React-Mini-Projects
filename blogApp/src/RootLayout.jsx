import { Outlet } from "react-router";
const RootLayout = () => {
    return (
        <div className="h-full w-full relative">
            <h1 className="text-4xl font-extrabold text-center">Blogs</h1>
            <Outlet />
        </div>
    );
};

export default RootLayout;
