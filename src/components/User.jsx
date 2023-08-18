import { useState, useEffect } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";

function User (props) {
    const userDetails = props.data;
    const getUserId = props.onLoad;

    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState([]);
    const [error, setError] = useState([]);


    const postsGet = () => {
        let user = getUserId();
        setUserId(user);

        let url = `https://blogapi-production-8080.up.railway.app/posts/${userId}`;
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            if (data.status === 404) {
                return setError(data.message)
            } else {
                return setPosts(data)
            }
        })
        .catch((error) => {
            alert(error)
        })
    }

    let navigate = useNavigate();
    const handleCreate = () => {
        let path = '/create'
        navigate(path)
    }


    useEffect(() => {
        postsGet();
    }, []);

    const handleUpdate = (postid) => {
        let path = `/edit/${postid}`
        navigate(path)
    }

    const handleDelete = (postid) => {
        let url = `https://blogapi-production-8080.up.railway.app/posts/${postid}`
        let info = {author: userId}
        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify(info),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ` +  JSON.parse(localStorage.getItem('jwt'))
            })
        }

        fetch(url, fetchData)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data === 'deleted') {
                let postscopy = [...posts];
                let postsfiltered = postscopy.filter(post => post._id !== postid);
                 return setPosts(postsfiltered);
            }
        })
        .catch((error) => {
            alert(error)
        })
    }

    return( 
        <div className="userpage">
            {userId.length === 0 &&
            <div className="usererror">Only logged in users can view their posts.</div> 
            }
            {userId.length > 0 &&
            <div className="userwelcome">Welcome to your profile {userDetails}</div> 
            }
            {posts.length === 0 && userId.length > 0 &&
            <div className="noposts">You have no posts</div>
            }
            {userId.length > 0 && 
            <button className="createpostbtn" type='button' onClick={handleCreate}>Create Post</button>
            }
            {posts.length > 0 && userId.length > 0 &&
            <div className="postlistcont">
                <div className="yourblogs">Your Blog Posts:</div>
                <ul className="postlist">
                    {posts.map(post => (
                        <li key={post._id} className="postitem">
                            <div className="post">
                                <Link to={`/post/${post._id}`}>
                                <div className="userposttitle">{post.title}</div>
                                </Link>
                                <div className="userpoststatus">
                                    {post.published === true &&
                                    <div className="statustext">Published</div>
                                    }
                                    {post.published === false && 
                                    <div className="statustext">Draft</div>
                                    }
                                </div>
                                <div className="postaction">
                                    <button className="postupdate" onClick={() => handleUpdate(post._id)}><img className="postupdateimg" src={'/update.svg'} alt=''></img>Update</button>
                                    <button className="postdelete" onClick={() => handleDelete(post._id)}><img className="postdeleteimg" src={'/delete.svg'} alt=''></img>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    )
}

export default User;