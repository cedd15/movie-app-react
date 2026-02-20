import MovieCard from "../components/MovieCard"
import type { Movie } from "../models/Movie"

function Home() {
    const movies : Movie[] = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1998"},
        {id: 3, title: "The Matrix", release_date: "1999"}
    ]

    const handleSearch = () => {

    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    )
}

export default Home;