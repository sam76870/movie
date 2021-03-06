import React, { Component } from 'react'
import { getMovies } from './MoviesService'

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies(),
            currSearchText: '',
            sort: { order: '', values: '' },
            limit: 4,
            page: 1
        }
    }
    onDelete = (id) => {
        let filterArr = this.state.movies.filter(movieObj => {
            // console.log(filterArr);
            return movieObj._id !== id;
        })
        this.setState({ movies: filterArr })
    }
    // Sorting funtion
    handleSort = (order, values) => {
        this.setState({ sort: { order, values } })
    }
    handleChange = (e) => {
        let val = e.target.value;
        // console.log(val);
        this.setState({ currSearchText: val })
    }

    // Prev next pages
    handlePages = (direction, totalPage) => {
        let page = this.state.page;
        if (direction === "next" && page < totalPage) {
            this.setState({ page: page + 1 });
        } else if (direction === "prev" && page > 1) {
            this.setState({ page: page - 1 });
        }
    }
    //We are kind of creating two states for similar content. As the filter movies operation is temporary and 
    // occurs with the state change of currSearchText we can simply form the filterMovies array in the render 
    // method itself. So there is no need to make it as a state.
    // if(val=='')
    // {
    //     this.setState({
    //     filterMovies:this.state.movies,
    //     currSearchText:''
    // })
    // return;
    // }
    // let filteredArr = this.state.movies.filter(movieObj=>{
    //     let title = movieObj.title.trim().toLowerCase();
    //     // console.log(title);
    //     return title.includes(val.toLowerCase());
    // })
    // this.setState({
    //     filterMovies:filteredArr,
    //     currSearchText:val
    // })
    render() {
        let { movies, currSearchText } = this.state;
        let filterMovies = [];
        if (currSearchText !== '') {
            filterMovies = movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase();
                // console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        } else {
            filterMovies = movies;
        }
        let { order, values } = this.state.sort;
        if (values === "stock") {
            if (order === "asc") {
                filterMovies.sort(
                    (a, b) => a.numberInStock - b.numberInStock
                );
            } else {
                filterMovies.sort(
                    (a, b) => b.numberInStock - a.numberInStock
                );
            }
        }
        else if (values === "rate") {
            if (order === "asc") {
                filterMovies.sort(
                    (a, b) => a.dailyRentalRate - b.dailyRentalRate
                );
            } else {
                filterMovies.sort(
                    (a, b) => b.dailyRentalRate - a.dailyRentalRate
                );
            }
        }
        // Pagination
        // let totalMovies = filterMovies;
        // let totalNumOfPages = Math.ceil(totalMovies.length / this.state.limit);
        let si = (this.state.page - 1) * this.state.limit;
        let ei = this.state.page * this.state.limit;
        console.log(si,ei);
        filterMovies = filterMovies.slice(si, ei);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h1>Hello</h1>
                    </div>
                    <div className="col-9">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">????</span>
                            <input type="text" className="form-control"placeholder="Search"
                                onChange={this.handleChange}/>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                        <i onClick={() =>
                                            this.handleSort("asc", "stock")} className="fas fa-caret-up"></i>
                                        Stock
                                        <i onClick={() =>
                                            this.handleSort("desc", "stock")} className="fas fa-caret-down"></i>
                                    </th>
                                    <th scope="col">
                                        <i onClick={() =>
                                            this.handleSort("asc", "rate")} className="fas fa-caret-up"></i>
                                        Rate
                                        <i onClick={() =>
                                            this.handleSort("desc", "rate")} className="fas fa-caret-down"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterMovies.map(movieObj => (
                                        <tr scope='row' key={movieObj._id}>
                                            <td>{movieObj.title}</td>
                                            <td>{movieObj.genre.name}</td>
                                            <td>{movieObj.numberInStock}</td>
                                            <td>{movieObj.dailyRentalRate}</td>
                                            <td><button onClick={() => this.onDelete(movieObj._id)} type="button" className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    ))
                                }
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
