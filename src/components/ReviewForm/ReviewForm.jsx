import { useState } from "react";
import { useParams } from "react-router-dom";
import * as movieService from '../../services/movieService'
const ReviewForm = ({ handleAddReview }) => {
    const [reviewFormData, setReviewFormData] = useState({
        title: '',
        text: '',
        notes: '',
    });
    const { movieId } = useParams();
    const handleChange = (evt) => {
        setReviewFormData({...reviewFormData, [evt.target.name] : evt.target.value })
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await handleAddReview(movieId, reviewFormData)
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div className="outer-container">
                    <div className="form-container">
                        <div className="form-container">
                        <label htmlFor="title-input">Title</label>
                        <input 
                            required
                            type="text"
                            name="title"
                            id="title-input"
                            value={reviewFormData.title}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="form-container">
                        <label htmlFor="text-input">Text</label>
                        <input
                            required
                            type="text"
                            name='text'
                            id="text-input"
                            value={reviewFormData.text}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="form-container">
                        <label htmlFor="notes-input">Notes</label>
                        <textarea                   
                            name="notes"
                            id="notes-input"
                            value={reviewFormData.notes}
                            onChange={handleChange}
                        />
                        </div>
                        <button type="submit">SUBMIT</button>
                    </div>
                </div>
            </form>
        </main>
    )
};
export default ReviewForm;