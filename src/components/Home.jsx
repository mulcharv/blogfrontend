import { useState, useEffect } from "react";
import Postcard from './Postcard';
import { Link } from 'react-router-dom';

function Home(props) {
    const userDetails = props.data;

    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch("https://blogapi-production-8080.up.railway.app/posts")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                let filteredData = [];
                for (const entry of data) {
                    if (entry.published) {
                        filteredData.push(entry)
                    }
                }
                setPosts(filteredData)
            })
            .catch((error) => {
                alert(error)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
    <div className="homecont">
        <div className='infocont'>
            <div className="infotext">
            <div className="subtitle">London's Premier Music Blog</div>
            <div className="infodesc">A community focused on sharing and discussing the latest on London based artists and acts touring through the city.</div>
            {userDetails.length > 0 && (
             <Link to='/create'>
                 <button className="infobtn" type='button'>Write Your Own Post!</button>
             </Link>
            )}
            {userDetails.length === 0 && (
            <Link to='/login'>
                 <button className="infobtn" type='button'>Write Your Own Post!</button>
            </Link>
            )
            }
        </div>
        <div className="infoimgcont">
            <img src={'/O2-Academy-Brixton-1536x1024.jpeg'} alt='' className='infoimg'></img>
        </div>
        </div>
        <div className="postscont">
            {posts.length > 0 && (
                <ul className="postslist">
                    {posts.map(post => (
                        <li key={post._id} className='homepost'>
                            <Postcard value={post}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
    )
}

export default Home;

