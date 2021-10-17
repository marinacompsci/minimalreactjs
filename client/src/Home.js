import { Link } from "react-router-dom";
import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {movies: []}
  }

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(resp => resp.json())
      .then(data => this.setState({movies: data}));
  }

  render() {
    const movies = this.state.movies.map(movie => 
        <li key={movie.title}>
          <h2>Title: <span><Link to={`/movie/${movie.title}`}>{movie.title}</Link></span></h2>        
        </li>
    );
    return (
      <div className="App">
        <h1>Movies</h1>
        <ul>{movies}</ul>      
      </div>
    );
  }
}