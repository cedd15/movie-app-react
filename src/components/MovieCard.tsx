import type { Movie } from "../models/Movie"
import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import type { MouseEvent } from "react"
interface Props {
    movie: Movie
}

function MovieCard({movie} : Props) {

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()

    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e : MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (favorite)
            removeFromFavorites(movie.id)
        else
            addToFavorites(movie)
    }

    const baseImgUrl = "https://image.tmdb.org/t/p/w500"

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`${baseImgUrl}${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>❤️</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;