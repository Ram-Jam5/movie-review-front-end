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

      // useEffect(() => {
      //   const fetchAllReviews =async () => {
      //     const reviewData
      //   }
      // })

      
      console.log('movie state:', movie);

    // const handleAddComment = async (commentFormData) => {
    //    const newComment = await movieService.createComment(movieId, commentFormData);
    //    setMovie({...movie, comments: [...movie.comments, newComment] });
    // };

      if (!movie) return <main>Loading...</main>;
    return (
          <div className="outer-container">
            <div className="main-container">
              <main>
              <header>
              <p>{movie.category.toUpperCase()}</p>
                <h1>{movie.title}</h1>
                <p>{movie.text}</p>
                
                <p>{movie.director}</p>
                <p>{movie.year}</p>
                <div>
                  <Link to={`/movies/${movieId}/reviews`}>New Review</Link>
                </div>
                <p>
                  {movie.author?.username|| "Unknown Author"} posted on
                  {new Date(movie.createdAt).toLocaleDateString()} 
                </p>
                {movie.author && movie.author._id === user._id && (
                  <>
                   <Link to={`/movies/${movieId}/edit`}>Edit</Link>
                  <button onClick={() => props.handleDeleteMovie(movieId)}>Delete</button>
                  </>
                )}

              </header>
              <>
              
              </>
              
              {/* reviewList component? */}
              <h2>Reviews</h2>
             {movie.reviews.map((review ,index) => (
              <div key={review._id || index}>
              <Link to={`/movies/${movieId}/${review._id}`}>
                <h4>{review.title}</h4>
              </Link>
                <p>{review.text}</p>
                <p>{review.author.username} posted on 
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              ))}
              

              </main>

          </div>
      </div>
    )
  }   
  
export default MovieDetails;         
            