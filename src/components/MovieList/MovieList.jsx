import { Link } from 'react-router-dom';

const MovieList = (props) => {

    return (
      <div className="outer-container">
        <div className="main-container">
          <main>
            {props.movies.map((movie, index) => (
              <div className="post-container">
                <Link style={{color: 'white'}} key={movie._id || index} to={`/movies/${movie._id}`}>
                  <article>
                    <header>
                      <div className="outer-container">
                        <h2>{movie.title}</h2>
                        <p>Year: {movie.year}</p>
                        <p>Director: {movie.director}</p>
                        <p>
                          {movie.category}
                        </p>
                      </div>
                    </header>
                  </article>
                </Link>
              </div>
            ))}
          </main>
        </div>
      </div>
)};

export default MovieList;
