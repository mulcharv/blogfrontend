import { useState, useRef, useEffect } from 'react';
import { redirect, useParams, useNavigate } from 'react-router-dom';

function CommentEdit(props) {

    const [content, setContent] = useState('');
    const [error, setError] = useState(false)

    let params = useParams();
    let postId = props.data;
    let checkuser = props.onLoad;
    let commentId = params.commentid;
    let navigate = useNavigate();


    const commentGet = () => {
        const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentId}`
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(data => {
                return setContent(data.content)
        })
        .catch((error) => {
            alert(error)
        })
    }

    const handleUpdate = () => {
        setError(false);
        const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}/comments/${commentId}`;
        const data = {
            content: content,
            userid: checkuser()
                    }
        console.log(data)
        const fetchData = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ` +  JSON.parse(localStorage.getItem('jwt'))
            })
        }

        fetch(url, fetchData)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.errors) {
                setError(data.errors);
            } else {
                let path = `/post/${postId}`
                navigate(path)
            }
        })
    }


    useEffect(() => {
        commentGet();
    }, [])

    return(
        <div className="commentformcont">
                <form className="commentform">
                    <div className="commentboxlabel">Edit Comment: </div>
                        <textarea name="content" className="commentbox"  value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    <button type="button" className="commentbtn" onClick={handleUpdate}>Submit</button>
                </form>
                {error &&
                <div className="commenterror">{error[0]}</div>
                }
            </div> 
    )
}

export default CommentEdit;

