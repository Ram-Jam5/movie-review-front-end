
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as movieService from '../../services/movieService';

const MovieForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (movieId) {
      props.handleUpdateMovie(movieId, formData);
    } else {
      props.handleAddMovie(formData);
    }
  };
  
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);
      setFormData(movieData);
    };
    if (movieId) fetchMovie();
  }, [movieId]);


   return (
    <div class="outer-container">
      <div class="main-container">
        <main>
          <form onSubmit={handleSubmit}>
            <h1>{movieId ? 'Edit Movie' : 'New Movie'}</h1>
            <label htmlFor="title-input">Title</label>
            <input
              required
              type="text"
              name="title"
              id="title-input"
              value={formData.title}
              onChange={handleChange}
            />
            <br></br>
            <label htmlFor="text-input">Text</label>
            <textarea
              required
              type="text"
              name="text"
              id="text-input"
              value={formData.text}
              onChange={handleChange}
            />
            <br></br>
            <button type="submit">SUBMIT</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MovieForm;