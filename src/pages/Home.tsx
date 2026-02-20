import { useState, type SubmitEvent } from "react"
import MovieCard from "../components/MovieCard"
import type { Movie } from "../models/Movie"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")

    const movies : Movie[] = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1998"},
        {id: 3, title: "The Matrix", release_date: "1999"}
    ]

    const handleSearch = (e : SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert(searchQuery)
        setSearchQuery("")
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    value={searchQuery}    
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="movies-grid">
                {
                    movies.map(movie => 
                        movie.title.toLowerCase().includes(searchQuery) && <MovieCard movie={movie} key={movie.id}/>)
                }
            </div>
        </div>
    )
}

export default Home;