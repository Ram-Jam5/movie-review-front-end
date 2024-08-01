import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieService from '../../services/movieService';

const ReviewDetails = () => {
  const { movieId, reviewId } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      const reviewData = await movieService.getReview(movieId, reviewId);
      setReview(reviewData);
    };
    fetchReview();
  }, [movieId, reviewId]);

  if (!review) return <main>Loading...</main>;

  const handleDeleteComment = async (commentId) => {
   await movieService.deleteComment(movieId, reviewId, commentId)
    setReview({
        ...review,
        comments: review.comments.filter((comment) => comment._id !== commentId),
    })
    console.log('deleted comment:', commentId)
  }

  return (
    <div className="review-details">
    <h1>{review.title}</h1>
    <p>{review.text}</p>
    <p>{review.author.username} posted on {new Date(review.createdAt).toLocaleDateString()}</p>
    <section>
      <h2>Comments</h2>
      {review.comments.length === 0 && <p>No comments yet.</p>}
      {review.comments.map((comment) => (
        <article key={comment._id}>
          <header>
            <p>Comment by {comment.author.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
            <Link to={`/movies/${movieId}/${reviewId}/comments/${comment._id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          </header>
          <p>{comment.text}</p>
        </article>
      ))}
    </section>
  </div>
  );
};

export default ReviewDetails;