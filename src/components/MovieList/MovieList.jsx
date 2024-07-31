import { Link } from 'react-router-dom';

const MovieList = (props) => {

    return ( 
    <>
    <div className="outer-container">
    <div className="main-container">  
        <main>
        {props.movies.map((movie, index) => (
          <Link key={movie._id || index} to={`/movies/${movie._id}`}>
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
          </Link>
        ))}
      </main>
      </div>
      </div>
  </>
)};


export default MovieList;
