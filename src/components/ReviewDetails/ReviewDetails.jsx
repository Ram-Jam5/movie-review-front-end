import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as movieService from '../../services/movieService';
import { AuthedUserContext } from '../../App';

const ReviewDetails = () => {
  const { movieId, reviewId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate()
const user = useContext(AuthedUserContext)
  useEffect(() => {
    const fetchReview = async () => {
        const reviewData = await movieService.getReview(movieId, reviewId)
        console.log(reviewData)
        setReview(reviewData)
    //     const movieData = await movieService.show(movieId);
    //   const foundReview = movieData.reviews.map((review) => {
    //     if (review._id === reviewId) return review
    //   })
    //   console.log(foundReview)
    //     setReview(movieData);
    // };
}
    fetchReview();
  }, []);

  if (!review) return <main>Loading...</main>;

  const handleDeleteComment = async (commentId) => {
   await movieService.deleteComment(movieId, reviewId, commentId)
    setReview({
        ...review,
        comments: review.comments.filter((comment) => comment._id !== commentId),
    })
    console.log('deleted comment:', commentId)
  }
  const handleDeleteReview = async () => {
    await movieService.deleteReview(movieId, reviewId)
    
    setReview(null)
    navigate('/movies')
  }

  return (
    <div className="review-details">
    <h1>{review.title}</h1>
    <p>{review.text}</p>
    <p>{review.author.username} posted on {new Date(review.createdAt).toLocaleDateString()}</p>
   <>
    <Link to={`/movies/${movieId}/${reviewId}/edit`}>Edit review</Link>
    <button onClick={() => handleDeleteReview()}>Delete</button>
   </>
    <section>
      <div>
        <br></br>
        <Link style={{fontSize:"16px"}} to={`/movies/${movieId}/${reviewId}/comments`}>Add Comment!</Link>
        <br></br>
        <br></br>
      </div>
      <h2>Comments</h2>
      {review.comments.length === 0 && <p>No comments yet.</p>}
      {review.comments.map((comment) => (
        <article key={comment._id}>
          <header>
            <br></br>
            <p>Comment by {comment.author.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
            <Link to={`/movies/${movieId}/${reviewId}/comments/${comment._id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          </header>
          <p>{comment.text}</p>
          <br></br>
        </article>
      ))}
    </section>
  </div>
  );
};

export default ReviewDetails;