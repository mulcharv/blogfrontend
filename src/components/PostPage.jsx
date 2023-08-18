import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Outlet } from "react-router-dom";


function PostPage (props) {

    const [post, setPost] = useState(false);
    const [postError, setPostError] = useState([]);
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [commentError, setCommentError] = useState(false);
    const [comments, setComments] = useState([]);


    let params = useParams();
    let postId = params.postid;
    let navigate = useNavigate();
    const getUser = props.onComment;
    const storepost = props.onCommUpd;

    const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}`;

    const postGet = () => { 
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            console.log(data)
               setPost(data);
               console.log(post)
            }
        )
        .catch((error) => {
            alert(error)
        })
    }

    const userIdGet = () => {
        let userId = getUser();
        return setUserId(userId);
    };

    const commentsGet = () => {
        const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}/comments`;
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            if (data !== null) {
                console.log(data);
                return setComments(data);
            }
        })
        .catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        postGet();
        userIdGet();
        commentsGet();
    }, []);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        setCommentError(false);
        const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}/comments`;
        let data = {
            name: userId,
            content: content,
            post: post
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', `Bearer ` + JSON.parse(localStorage.getItem('jwt')))
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        }

        fetch(url, fetchData)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.errors) {
                setCommentError(data.errors);
            } else {
                console.log(data)
                let commentsCopy = [...comments];
                commentsCopy.push(data);
                setContent('');
                setComments(commentsCopy);
            }
            return;
        })
        .catch((error) => {
            alert(error)
        })
    }

    const handleCommentUp = (commentid) => {
        storepost(postId);
        let path = `/comment/${commentid}`
        navigate(path)
    }

    const handleCommentDel = (commentid) => {
        let url = `https://blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentid}`;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', `Bearer ` + JSON.parse(localStorage.getItem('jwt')))

        let fetchData = {
            method: 'DELETE',
            headers: headers
        }
        fetch(url, fetchData)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.status === 401) {
                return;
            }
            else {
                let commentscopy = [...comments];
                let commentsfiltered = commentscopy.filter(comment => comment._id !== commentid);
                return setComments(commentsfiltered);
            }
        })
        }

    

    const handleLogin = () => {
        let path = '/login'
        navigate(path)
    }

    return(
        <div className="postpage">
            {!post && 
            <div className="postmiss">Post not found</div>
            }
            {post && 
            <div className="postcont">
                <div className="posttitle">{post.title}</div>
                <div className="postsubtitle">{post.timestamp_formatted} | Posted by {post.author.username}</div>
                <div className="postcontent">{post.content}</div>
            </div>
            }
            {post && userId.length === 0 &&
            <button className="postlogbtn" type="button" onClick={handleLogin}> Please login to comment.</button>
            }
            {post && userId.length > 0 && 
            <div className="postcommentcont">
                <form className="commentform">
                    <div className="commentprompt">Submit Comment:</div>
                    <textarea name="content" className="commentbox" placeholder="Type your comment here" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button type="button" className="commentbtn" onClick={handleSubmit}>Submit</button>
                </form>
                {commentError &&
                <div className="commenterror">{commentError}</div>
                }
            </div> 
            }
            {comments.length === 0 &&
            <div className="nocomments">No comments on this post yet.</div> 
            }
            {comments.length === 0 && userId.length > 0 &&
            <div className="commentprompt">Be the first to comment!</div> 
            }
            {comments.length > 0 &&
            <div className="commentslength">{comments.length} Comments</div> 
            }
            {comments.length > 0 &&
            <ul className="commentslist">
                {comments.map(comment => (
                    <li key={comment._id} className="commentitem">
                        <div className="comment">
                            <div className="commentinfo">
                                <div className="commentuser">{comment.name.username}</div>
                                <div className="commentdate">{comment.timestamp_formatted}</div>
                            </div>
                            <div className="commentcontent">{comment.content}</div>
                            {userId === comment.name._id &&
                            <div className='commentbtns'>
                                <button className="commentupdate" onClick={() => handleCommentUp(comment._id)}>Update</button>
                                <button className="commentdelete" onClick={() => handleCommentDel(comment._id)}>Delete</button> 
                            </div>
                            }
                        </div>
                    </li>
                ))}
            </ul> 
            }
        <Outlet />
        </div>
    )
}

export default PostPage;