import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as movieService from '../../services/movieService';

const ReviewPage = () => {
    const [review, setReview] = useState(null);
    const { movieId, reviewId } = useParams();
    
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const reviewData = await movieService.getReview(movieId, reviewId);
                setReview(reviewData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchReview();
    }, [reviewId]);

    return (
        <div className="outer-container">
            <div className="main-container">
                <h2>{review.title}</h2>
                <h3>{review.text}</h3>
                {review.comments.map((comment) => (
                    <div key={comment._id}>
                        <h4>{comment.text}</h4>
                    </div>
                ))}
            </div>
        </div>

)};

export default ReviewPage;
