import { Link } from 'react-router-dom';

function Postcard(props) {
    const post = props.value;
    const info = post[0];
    console.log(info)
    
    return (
        <div className='postcardcont'>
        <Link to={`/post/${info._id}`}>
            <div className='postcardtitle'>{info.title}</div>
            <div className='postcarddate'>Date: {info.timestamp_formatted}</div>
            <div className='postcardauthor'>By: {info.author.username}</div>
        </Link>
        </div>
    )
}

export default Postcard;