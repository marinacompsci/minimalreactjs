import React from "react"; 
import { withRouter, Link } from "react-router-dom";


class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {movie: ""}
  }

  componentDidMount() {
    const { title } = this.props.match.params;

    fetch(`http://localhost:3000/movies/${title}`)
      .then(resp => resp.json())
      .then(data => this.setState({movie: data}));
  }

  render() {
    return(
        <div>
          <h2>Title: <span>{this.state.movie.title}</span></h2>
          <h2>Year of Release: <span>{this.state.movie.release}</span></h2>
          <h2>Director: <span>{this.state.movie.director}</span></h2>
          <button><Link to="/">Back</Link></button>
        </div>
    );
  }

}

export default withRouter(Movie);