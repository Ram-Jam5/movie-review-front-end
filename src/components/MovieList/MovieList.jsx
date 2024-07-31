import { Link } from 'react-router-dom';

const MovieList = (props) => {

    return (
      <div className="outer-container">
        <div className="main-container">
          <main>
            {props.movies.map((movie, index) => (
<<<<<<< HEAD
              <Link style={{color: 'white'}} key={movie._id || index} to={`/movies/${movie._id}`}>
=======
              <Link style={{color: 'white'}} key={movie._id} to={`/movies/${movie._id}`}>
>>>>>>> 8296204149f9afac0eaaabc2c4976dc248e2d78e
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
  </>
)};


export default MovieList;
