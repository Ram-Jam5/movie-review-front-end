import { Link } from 'react-router-dom';

const MovieList = (props) => {
    return (
      <div class="outer-container">
        <div class="main-container">
          <main>
            {props.movies.map((movie) => (
              <Link style={{color: 'white'}} key={movie._id} to={`/movies/${movie._id}`}>
                <article>
                  <header>
                    <h2>{movie.title}</h2>
                    <p>Year: {movie.year}</p>
                    <p>Director: {movie.director}</p>
                    <p>
                      {movie.category}
                    </p>
                  </header>
                </article>
                <br></br>
              </Link>
            ))}
          </main>
        </div>
      </div>
    )
};
export default MovieList;
