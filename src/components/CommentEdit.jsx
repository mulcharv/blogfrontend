import { useState, useRef, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';

function CommentEdit(props) {

    const [content, setContent] = useState('');
    const [error, setError] = useState('')

    let params = useParams();
    let postId = params.postid;
    let commentId = params.commentid;

    const commentGet = () => {
        const url = `blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentId}`
        fetch(url)
        .then((response) => {
            return response
        })
        .then(data => {
            if (data.length > 0) {
                return setContent(data.content)
            }
        })
    }

    const handleUpdate = () => {
        setError('');
        const url = `blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentId}`;
        const fetchData = {
            method: 'PUT',
            body: JSON.stringify(content),
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
                setError(data.errors);
            } else {
                return redirect(`/posts/${postId}`)
            }
        })
    }


    useEffect(() => {
        commentGet();
    })

    return(
        <div className="postcommentcont">
                <form className="commentform">
                    <label className="commentboxlabel">
                        <textarea name="content" className="commentbox"  value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </label>
                    <button type="button" className="commentbtn" onClick={handleUpdate}></button>
                </form>
                <div className="commenterror">{error[0]}</div>
            </div> 
    )
}

export default CommentEdit;

