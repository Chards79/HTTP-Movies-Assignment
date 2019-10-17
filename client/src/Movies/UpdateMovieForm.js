import React, { useState } from "react";
import axios from "axios";

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState({
        id: Number(props.match.params.id),
        title: '',
        director: '',
        metascore: null,
        stars: ''
    });

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(movie);
        axios
            .put(`http://localhost5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res.data);
                props.updateMovie(res.data);
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