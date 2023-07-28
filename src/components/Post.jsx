import { Outlet } from "react-router-dom";

function Post () {

    return (
        <div className="postmain">
            <Outlet />
        </div>
    );
};

export default Post;