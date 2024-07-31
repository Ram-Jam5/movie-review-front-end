import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as movieService from '../../services/movieService'
import { AuthedUserContext } from '../../App';
import CommentForm from '../CommentForm/CommentForm';
import { Link } from 'react-router-dom';


const MovieDetails = (props) => {
  const [movie, setMovie] = useState(null);
  // const [reviews, setReviews] =  useState([])
    const { movieId } = useParams();
    console.log('movieId', movieId);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchMovie = async () => {
          const movieData = await movieService.show(movieId);
          console.log('movieData', movieData);
          setMovie(movieData);
        };
        fetchMovie();
      }, [movieId]);

      // useEffect(() => {
      //   const fetchAllReviews =async () => {
      //     const reviewData
      //   }
      // })

      
      console.log('movie state:', movie);

    const handleAddComment = async (commentFormData) => {
       const newComment = await movieService.createComment(movieId, commentFormData);
       setMovie({...movie, comments: [...movie.comments, newComment] });
    };

      if (!movie) return <main>Loading...</main>;
    return (
          <div className="outer-container">
            <div className="main-container">
              <main>
              <header>
                <h1>{movie.title}</h1>
                <p>{movie.text}</p>
                <p>{movie.category}</p>
                <p>{movie.director}</p>
                <p>{movie.year}</p>
                <p>
                  {/* {movie.author.username} posted on
                  {new Date(movie.createdAt).toLocaleDateString()} */}
                </p>
              </header>
              <>
              {/* {movie.reviews.map((review) => (
                <article key={review._id}>
                  
                </article>
                <p>
                  {review.title}
                </p>
              ))} */}
              </>
            <>
            
            </>
              {/* <section> */}
              {/* <h2>Comments</h2>
              <CommentForm  handleAddComment={handleAddComment} /> */}

            {/* {!movie.comments.length && <p>There are no comments.</p>}

            {movie.comments.map((comment) => (
              <article key={comment._id}>
                <header>
                  <p>
                    {comment.author.username} posted on
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  {movie.author._id === user._id && ( */}
              {/* <> */}
          
          {/* <Link to={`/movies/${movieId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteMovie(movieId)}>Delete</button>

              </>
                  )}
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </section> */}
            </main>
          </div>
      </div>
    )
};

export default MovieDetails;