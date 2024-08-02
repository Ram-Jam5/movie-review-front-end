import { useState } from "react";

const ReviewForm = ({ movieId, handleAddReview }) => {
    const [reviewFormData, setReviewFromData] = useState({
        title: '',
        text: '',
        notes: '',
    });
    
    const handleChange = (evt) => {
        setReviewFromData({...reviewFormData, [evt.target.name] : evt.target.value })
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await handleAddReview(movieId, reviewFormData)
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title-input">Title</label>
                <input 
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={reviewFormData.title}
                    onChange={handleChange}
                />
                <label htmlFor="text-input">Text</label>
                <input
                    required
                    type="text"
                    name='text'
                    id="text-input"
                    value={reviewFormData.text}
                    onChange={handleChange}
                />
                <label htmlFor="notes-input">Notes</label>
                <textarea                   
                    name="notes"
                    id="notes-input"
                    value={reviewFormData.notes}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )
};
export default ReviewForm;