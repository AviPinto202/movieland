import YouTube from 'react-youtube';


const MovieVideo = ({ vid }) => {


    return (
        <div className='videoSection'>
            <YouTube
                videoId={vid}

            /> </div>
    );
}

export default MovieVideo;