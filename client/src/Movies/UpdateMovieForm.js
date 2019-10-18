import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie)
    useEffect(() => {
        console.log(props);
        const movieToEdit = props.movie.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );

        if (movieToEdit) setMovie(movieToEdit)
    }, [props.match.params.id])

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        // if (e.target.name === "metascore") {
        //     value = parseInt(value, 10);
        // }
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const stars = Array.isArray(movie.stars) ? movie.stars : movie.stars.split(',');
        const updatedMovie = { ...movie, stars }
        axios
            .put(`http://localhost5000/api/movies/${movie.id}`, updatedMovie)
            .then(res => {
                console.log(res.data);
                props.updateMovie([...setMovie, res.data]);
                props.history.push('/')
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="Title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="Director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="stars"
                    onChange={handleChanges}
                    placeholder="Stars"
                    value={movie.stars}
                />
                <div className="baseline" />

                <button className="update-button">Update</button>
            </form>
        </div>
    );
}
export default UpdateMovieForm;