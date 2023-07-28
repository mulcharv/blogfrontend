import { useState, useRef, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import uniqid from 'uniqid';


function Create(props) {

    const getUser = props.onLoad;

    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [published, setPublished] = useState(false);
    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState('');
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

    const handleImage = (imgfile) => {
        let reader = new FileReader();
        reader.readAsBinaryString(imgfile);

        reader.onload = () => {
                setSelectedFile({
                queryImage: reader.result
            })
        }
    };

    const userIdGet = () => {
        let userId = getUser();
        return setUserId(userId);
    };

    const handleSubmit = () => {
        setErrors([]);
        const url = 'blogapi-production-8080.up.railway.app/posts'
        let data = {
            title: title,
            content: TinyMCEEditor.activeEditor.getContent(),
            author: userId,
            cover_image: selectedFile,
            published: published,
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
            return response;
        })
        .then((data) => {
            if (data.errors.length > 0) {
                setErrors(data.errors);
            } else {
                return redirect('/user')
            }
        })
    }

    useEffect(() => {
        userIdGet();
    }, [])

    return(
    <div className='createpage'>
        <label className='createtitlelab'>Title:
            <input type="text" className='createtitle' name="username" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of post"></input>
        </label>
        <label className='createcoverlab'>Cover Image:
        <input className='createcoverimg' type="file" accept='image/png, image/jpeg, image/jpg' onInput={(e) => handleImage(e.target.files[0])}></input>
        </label>
        <Editor
        apiKey='upi36k57pc1yky084fkd0nb9ivkuuu1qnq08phkcm5xrhmn5'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="Your content here"
        init={{
            height: '40vh',
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 
                'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
            toolbar: 'undo redo | blocks | ' + 
            'bold italic forecolor | alignleft aligncenter ' + 
            'alignright alignjustify | bullist numlist outdent indent | ' + 
            'removeformat | help', 
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        />
        <label className='createpublishlab'>Publish Post:
            <input type='checkbox' className='createpublish' onClick={handleCheck}></input>
        </label>
        <button type='button' className='createbtn' onClick={handleSubmit}>Submit Blog</button>
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