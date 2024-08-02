import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as movieService from '../../services/movieService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { movieId, reviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentData = async () => {
      const movieData = await movieService.show(movieId);
      //const comment = movieData.reviews.find((review) => review._id === reviewId).comments.find((comment) => comment._id === commentId);
      if (comment) {
        //setFormData({ text: comment.text })
      }
    }
    //fetchCommentData();

  },[movieId, reviewId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleAddComment = async (movieId, reviewId, commentFormData) => {
    try {
      const newComment = await movieService.createComment(movieId, reviewId, commentFormData)
      setComments([newComment, ...comments])
      navigate(`/movies/${movieId}/${reviewId}`)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if(movieId && reviewId) {
      await handleAddComment(movieId, reviewId, formData)
    } else {
      await props.handleAddComment(formData)
    }
    navigate(`/movies/${movieId}/${reviewId}`)
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
