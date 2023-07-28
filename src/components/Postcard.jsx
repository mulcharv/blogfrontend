import { Link } from 'react-router-dom';

function Postcard(props) {
    const post = props.value;

    return (
        <Link to={`/post/${post._id}`}>
        <div className='postcardcont'>
            <div className='postcardtitle'>{post.title}</div>
            <div className='postcarddate'>{post.timestamp_formatted}</div>
            <div className='postcardimgcont'><img src={('data:image/jpeg;base64,' + Buffer.from(post.cover_image).toString('base64'))} alt=''></img></div>
            <div className='postcardauthor'>{post.author}</div>
        </div>
        </Link>
    )
}

export default Postcard;