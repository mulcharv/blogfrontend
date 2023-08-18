import { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import uniqid from 'uniqid';


function Create(props) {

    const getUser = props.onLoad;
    const navigate = useNavigate();

    let jwt = localStorage.getItem('jwt');


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState(() => getUser());
    const [selectedFile, setSelectedFile] = useState([]);

    const handleCheck = () => {
        if (published === false) {
            setPublished(true)
        }
        if (published === true) {
            setPublished(false)
        }
        return;
    }

    const userIdGet = () => {
        let userId = getUser();
        console.log(userId);
        return setUserId(userId);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        const url = 'https://blogapi-production-8080.up.railway.app/posts'
        let data = {
            title: title,
            content: content,
            author: userId,
            published: published,
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', `Bearer ` + JSON.parse(localStorage.getItem('jwt')))
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        }

        console.log(fetchData)

        fetch(url, fetchData)
        .then((response) => {
            console.log('reached')
            return response.json();
        })
        .then((data) => {
            console.log('reached here too')
            if (data.errors) {
                setErrors(data.errors);
            } else {
                navigate('/user')
            }
        })
    }

    useEffect(() => {
        userIdGet();
    }, [])

    return(
    <div className='createpage'>
        {!jwt &&
        <div className='nocreate'>You must be logged in to create a post!</div>
         }
         {jwt &&
        <div className='createinfos'>
        <div className='createheader'>Create Post:</div>
        <div className='createblock'>
        <div className='createtitlelab'>Title:</div>
        <input type="text" className='createtitle' name="username" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of post"></input>
        <div className='createcontentlab'> Content: </div>
        <textarea className='createcontent' name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Your post content here'></textarea>
        <label className='createpublishlab'>Publish Post:
            <input type='checkbox' className='createpublish' onClick={handleCheck}></input>
        </label>
        <button type='button' className='createbtn' onClick={(e) => handleSubmit(e)}>Submit Blog</button>
        </div>
        </div>
        }
        {errors.length > 0 &&
                    <ul className="errorslist">
                        {errors.map(error => (
                            <li key={uniqid()} className="postcreateerr">
                                {error.msg}
                            </li>
                        ))}
                    </ul>
                    }
                    
    </div>
    )
}

export default Create;