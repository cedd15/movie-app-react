import React, { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../models/Movie";

interface Props {
    children: React.ReactNode
}

interface MovieContext {
    favorites: Movie[]
    addToFavorites: (movie: Movie) => void
    removeFromFavorites: (movieId: number) => void
    isFavorite: (movieId: number) => boolean
}

const MovieContext = createContext<MovieContext>({} as MovieContext)

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children} : Props) => {

    const [favorites, setFavorites] = useState<Movie[]>([])

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites")

        if (storedFavorites)
            setFavorites(JSON.parse(storedFavorites))
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie : Movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId : number) => {
        setFavorites(prev => prev.filter(m => m.id !== movieId))
    }

    const isFavorite = (movieId : number) => {
        return favorites.some(m => m.id === movieId)
    }

    const value = {
        favorites, 
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}