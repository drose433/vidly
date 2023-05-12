import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';

class Genre extends Component {
    state = {
        genres: getGenres()
    }

    handleGenres = () =>{

    };

    render() { 
        return ( 
            <ul className="list-group">
                <li className="list-group-item active">All Genres</li>
                {this.state.genres.map(genre =>
                    <li className="list-group-item" onClick={() => this.handleGenres()}>{genre.name}</li>  
                )}
            </ul>
        );
    }
}
 
export default Genre;