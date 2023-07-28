import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Outlet } from "react-router-dom";


function PostPage (props) {
    const userDetails = props.data;

    const [post, setPost] = useState([]);
    const [postError, setPostError] = useState([]);
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [commentError, setCommentError] = useState([]);
    const [comments, setComments] = useState([]);


    let params = useParams();
    let postId = params.postid;
    let navigate = useNavigate();
    const getUser = props.onComment;

    const url = `blogapi-production-8080.up.railway.app/posts/${postId}`;

    const postGet = () => { 
        setPostError([]);
        fetch(url)
        .then((response) => {
            return response
        })
        .then(data => {
            if (data.status === 404) {
               return setPostError(data.message)
            } else {
                return setPost(data);
            }
        })
        .catch((error) => {
            alert(error)
        })
    }

    const userIdGet = () => {
        let userId = getUser();
        return setUserId(userId);
    };

    const commentsGet = () => {
        const url = `blogapi-production-8080.up.railway.app/posts/${postId}/comments`;
        fetch(url)
        .then((response) => {
            return response
        })
        .then(data => {
            if (data.length > 0) {
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
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        setCommentError([]);
        const url = `blogapi-production-8080.up.railway.app/posts/${postId}/comments`;
        let data = {
            name: userId,
            content: content,
            post: post
        }

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
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
            if (data.errors.length > 0) {
                setCommentError(data.errors);
            } else {
                let commentsCopy = [...comments];
                commentsCopy.push(data);
                setComments(commentsCopy);
            }
            return;
        })
        .catch((error) => {
            alert(error)
        })
    }

    const handleCommentUp = (commentid) => {
        let path = `/posts/${postId}/${commentid}`
        navigate(path)
    }

    const handleCommentDel = (commentid) => {
        let url = `blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentid}`;

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

    return (
        <div className="postpage">
            {post.length === 0 && 
            <div className="postmiss">{postError}</div>
            }
            {post.length > 0 && 
            <div className="postcont">
                <div className="posttitle">{post.title}</div>
                <div className="postsubtitle">{post.timestamp_formatted} | Posted by {post.author}</div>
                <div className="postimgcont">
                    <img className="postimg" src={('data:image/jpeg;base64,' + Buffer.from(post.cover_image).toString('base64'))} alt=''></img>
                </div>
                <div className="postcontent">{post.content}</div>
            </div>
            }
            {post.length > 0 && userDetails.length === 0 &&
            <button className="postlogbtn" type="button" onClick={handleLogin}> Please login to comment.</button>
            }
            {post.length > 0 && userDetails.length > 0 && 
            <div className="postcommentcont">
                <form className="commentform">
                    <label className="commentboxlabel">
                        <textarea name="content" className="commentbox" placeholder="Type your comment here" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </label>
                    <button type="button" className="commentbtn" onClick={handleSubmit}></button>
                </form>
                {commentError.length > 0 &&
                <div className="commenterror">{commentError[0]}</div>
                }
            </div> 
            }
            {comments.length === 0 &&
            <div className="nocomments">No comments on this post yet.</div> 
            }
            {comments.length === 0 && userDetails.length > 0 &&
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
                                <button className="commentupdate" onClick={handleCommentUp(comment._id)}>Update</button>
                                <button className="commentdelete" onClick={handleCommentDel(comment._id)}>Delete</button> 
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