import '../App.css';
import React, { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';


const Main = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}&s=${title}`)
            const data = await response.json();
            setMovies(data.Search);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        searchMovies('')
    }, [])



    return (
        <div className='main'>
            <h1>Movie Land</h1>
            <div className='search'>
                <input
                    placeholder='Search Movie...'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <Link to={`/moviepage/${movie.imdbID}`} key={movie.imdbID}>
                            <MovieCard movie={movie} key={movie.imdbID} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default Main;