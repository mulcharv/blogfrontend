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

        let url = `blogapi-production-8080.up.railway.app/posts/${userId}`;
        fetch(url)
        .then((response) => {
            return response
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
        return redirect(`/posts/${postid}/edit`)
    }

    const handleDelete = (postid) => {
        let url = `blogapi-production-8080.up.railway.app/posts/${postid}`
        let fetchData = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            })
        }

        fetch(url, fetchData)
        .then((response) => {
            return response
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
            {posts.length === 0 && userId.length > 0 &&
            <div className="noposts">You have no posts</div>
            }
            {posts.length > 0 && userId.length > 0 && 
            <button type='button' onClick={handleCreate}></button>
            }
            {posts.length > 0 && userId.length > 0 &&
            <div className="postlistcont">
                <div className="yourblogs">Your Blog Posts</div>
                <div className="postheadline">
                    <div className="posttitlehead">TITLE</div>
                    <div className="poststatushead">STATUS</div>
                    <div className="postactionhead">ACTION</div>
                </div>
                <ul className="postlist">
                    {posts.map(post => (
                        <li key={post._id} className="postitem">
                            <div className="post">
                                <Link to={`posts/${post._id}`}>
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
                                    <button className="postupdate" onClick={handleUpdate(post._id)}><img src={require('../assets/update.svg').default} alt=''></img>Update</button>
                                    <button className="postdelete" onClick={handleDelete(post._id)}><img src={require('../assets/delete.svg').default} alt=''></img>Delete</button>
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