import { useEffect, useState, type SubmitEvent } from "react"
import MovieCard from "../components/MovieCard"
import type { Movie } from "../models/Movie"
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../services/api"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                setError(`Error: ${err}`)
            }
            finally {
                setLoading(false)
            }
        }
        
        loadPopularMovies()
    }, [])

    const handleSearch = async (e : SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!searchQuery.trim()) return

        if (loading) return

        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError("")
        } catch (err) {
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

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

            {error && (
                <div className="error-message">{error}</div>
            )}

            {
                loading ? (
                    <div className="loading">
                        Loading...
                    </div>
                ) : (
                    <div className="movies-grid">
                        {
                            movies.map(movie => 
                                movie.title.toLowerCase().includes(searchQuery) && <MovieCard movie={movie} key={movie.id}/>)
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Home;