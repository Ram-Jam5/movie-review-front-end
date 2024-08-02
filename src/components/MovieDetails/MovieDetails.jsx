import { useParams, } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as movieService from '../../services/movieService'
import { AuthedUserContext } from '../../App';
// import CommentForm from '../CommentForm/CommentForm';
import { Link } from 'react-router-dom';



const MovieDetails = (props) => {
  const [movie, setMovie] = useState(null);
  // const [reviews, setReviews] =  useState([])
    const { movieId } = useParams();
    console.log('movieId', movieId);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchMovie = async () => {
          try {
          const movieData = await movieService.show(movieId);
          console.log('movieData in fetchMovie:', movieData);
          
          if(movieData.author) {
            console.log('Author in movieData:', movieData.author);
            console.log('Author username:', movieData.author.username);
          }
          setMovie(movieData);
        }catch (error) {
          console.error('Error fetching movie:', error);
        }
        };
        fetchMovie();
      }, [movieId]);

      console.log('movie state:', movie);

      if (!movie) return <main>Loading...</main>;
    return (
          <div className="outer-container">
            <div className="main-container">
              <main>
              <header>

              <p style={{ fontWeight: 'bold' }}>{movie.category.toUpperCase()}</p>
              <br></br>
              <h1>{movie.title}</h1>
              <br></br>
              <p>{movie.text}</p>
              <p>Director: {movie.director}</p>
              <p>Year: {movie.year}</p>
              <br></br>
              {movie.author && movie.author._id === user._id && (
                <>
                  <Link to={`/movies/${movieId}/edit`}>Edit</Link>
                <button style={{margin:"8px"}} onClick={() => props.handleDeleteMovie(movieId)}>Delete</button>
                </>
              )}
              <div>
                <br></br>
                <Link style={{fontSize:"28px", fontWeight:"bold"}} to={'/movies/:movieId/reviews'}>Add Review!</Link>
                <br></br>
                <br></br>
              </div>


              </header>
              <>
              </>
              <br></br>
              <br></br>
              <h2>Reviews</h2>
             {movie.reviews.map((review ,index) => (
              <div key={review._id || index}>
              <Link to={`/movies/${movieId}/${review._id}`}>
                <h4 style={{fontSize:"24px"}}>{review.title}</h4>
              </Link>
                <p>{review.text}</p>
                <br></br>
                <span>{review.author.username} posted on&nbsp;
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              ))}
              </main>
          </div>
      </div>
    )
  }   
  
export default MovieDetails;         
            