import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io'
import MovieVideo from '../components/MovieVideo';

const MoviePage = () => {
    const [movie, setMovie] = useState({});
    const [loading, setloading] = useState(false);
    const [ytVideoId, setytVideoId] = useState('')
    const [playing, setPlaying] = useState(false);
    const { id } = useParams();

    const getMovieById = async (id) => {
        setloading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}&i=${id}`)
        const data = await response.json();
        setMovie(data);
        setloading(false)
    }


    const videoError = () => {
        return (
            <div className='videoSection'>
                <p className='videoErr'>Video Not Found or Error In The Server</p>
            </div>
        )
    }

    // The API Limited to use , so i used in the only first video.
    const videosSearch = async (searchWords) => {
        try {
            if (!searchWords.includes("undefined")) {
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchWords}&maxResults=3&key=${process.env.REACT_APP_GOOGLE_API_KEY}&type=video`)
                const data = await response.json();
                const vid = data.items[0].id.videoId;
                setytVideoId(vid);
            }
            else {
                <Loading />
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMovieById(id)
        videosSearch(`${movie.Title} Official Trailer`)
    }, [id, movie.Title])

    return (
        <div className='moviePage'>

            <div className='backBtn'>
                <Link to={"/"}><span>Back</span><IoMdArrowRoundBack className='backIcon' /></Link>
            </div>

            {loading ? <Loading />
                :
                <div className='movieContent' disabled={loading}>
                    <img src={movie.Poster} alt="movieimg" />
                    <h1>{movie.Title}</h1>
                    <p><span>Release Date</span> - {movie.Released}</p>
                    <p><span>Genre</span> - {movie.Genre}</p>
                    <p><span>Director</span> - {movie.Director}</p>
                    <p><span>Rating</span> - {movie.Metascore}</p>
                    <p><span>Imdb Rating</span> - {movie.imdbRating}</p>
                    <p className='moviePlot'>{movie.Plot}</p>

                    <button className='trailerBtn' onClick={() => setPlaying(true)}>Watch Trailer</button>
                    {!playing ?
                        <div></div> : <div>
                            {ytVideoId ?
                                <MovieVideo
                                    vid={ytVideoId}
                                /> :
                                videoError()
                            }
                        </div>
                    }
                </div>
            }
        </div >
    );
}

export default MoviePage;