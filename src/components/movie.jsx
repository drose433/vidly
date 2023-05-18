import React, { Component } from 'react';
import { getMovies } from "..//services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _, { filter } from "lodash";
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount(){
        const genres = [{_id:"", name:"All Genres" },...getGenres()];
        this.setState({movies: getMovies(), genres});
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});

    };
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1});
    };

    handleSearch = query =>{
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = sortColumn =>{
       this.setState({sortColumn});

    };

    getPagedData= () =>{

        const {
            currentPage, 
            pageSize, 
            selectedGenre,
            searchQuery,
            movies: AllMovies, 
            sortColumn} = this.state;
        
        let filtered = AllMovies;
        if(searchQuery){
            filtered = AllMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase()
            ));
        }else if(selectedGenre && selectedGenre._id){
            filtered = AllMovies.filter(m => m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies};
    };

    render() {
        
        const {currentPage, pageSize, searchQuery, sortColumn} = this.state;

        if(this.state.movies.length === 0){
            return <p>There are no movies in the database.</p>;
        }

        const {totalCount, data: movies} = this.getPagedData();

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 m-2">
                            <ListGroup
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}/>
                        </div>
                        <div className="col-sm-8">
                            <Link
                            to="/movies/new"
                            className="btn btn-primary"
                            style={{ marginBottom: 20 }}
                            >New Movie</Link>
                            <p>Showing {totalCount} movies in the database.</p>
                            <SearchBox value={searchQuery} onChange={this.handleSearch} />
                            <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                            />
                            <Pagination
                            itemsCount={totalCount}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;