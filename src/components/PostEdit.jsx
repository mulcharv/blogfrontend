import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { redirect } from 'react-router-dom';
import uniqid from 'uniqid';

function PostEdit(props) {

    const getUser = props.onLoad;

    const [findError, setFindError] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [errors, setErrors] = useState(false);
    const [userId, setUserId] = useState('');
    let params = useParams();
    let postId = params.postid;
    let navigate = useNavigate();

    let url = `https://blogapi-production-8080.up.railway.app/posts/${postId}`;

    const postGet = () => {
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            if (data.status === 401) {
                return setFindError(data.message)
            } else {
                setTitle(data.title);
                setContent(data.content);
                setPublished(data.published);
                return;
            }
        })
        .catch((error) => {
            alert(error)
        })
    };

    const userIdGet = () => {
        let userId = getUser();
        return setUserId(userId);
    };

    const handleUpdate = () => {
        setErrors([]);
        const url = `https://blogapi-production-8080.up.railway.app/posts/${postId}`
        let data = {
            title: title,
            content: content,
            author: userId,
            published: published,
        }


        let fetchData = {
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
                setErrors(data.errors);
            } else {
                let path ='/user'
                navigate(path);
            }
        })
    }

    useEffect(() => {
        postGet();
        userIdGet();
    }, [])

    return(
        <div className='editpage'>
            {findError && 
            <div className='postmiss'>{findError}</div>
            }
            {content &&
            <div className='posteditcont'>
                <div className='editheader'>Edit Post: </div>
                <div className='createtitlelab'> Title: </div>
                <input type="text" className='createtitle' name="username" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of post"></input>
                <div className="createcontentlab"> Content: </div>
                <textarea name="content" className="postbox"  value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <label className='createpublishlab'>Publish Post:
                    <input type='checkbox' checked={published} className='createpublish' onChange={(e) => setPublished(e.target.checked)}></input>
                </label>
                <button type='button' className='updatebtn' onClick={handleUpdate}>Submit Blog</button>
                {errors &&
                    <ul className="errorslist">
                        {errors.map(error => (
                            <li key={uniqid()} className="postcreateerr">
                                {error.msg}
                            </li>
                        ))}
                    </ul>
                    }
            </div>
            }
        </div>
    )
}

export default PostEdit;