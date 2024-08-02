
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as movieService from '../../services/movieService';

const MovieForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    category:'',
    year: ''
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
    <div className="outer-container">
      <div className="main-container">
          <main>
          <form onSubmit={handleSubmit}>
            <h1>{movieId ? 'Edit Movie' : 'New Movie'}</h1>
            <label htmlFor="title-input">Title</label>
            <input
              required
              // eslint-disable-next-line react/no-unknown-property
              unique="title"
              type="text"
              name="title"
              id="title-input"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="director-input">Director</label>
            <input
              required
              type="text"
              name="director"
              id="director-input"
              value={formData.director}
              onChange={handleChange}
            />
            <label htmlFor="category-input">Genre</label>
            <select
              required
              name="category"
              id="category-input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Action">Action</option>
              <option value="Animation">Animation</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Romance">Romance</option>
              <option value="Science-Fiction">Science-Fiction</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
            </select>

            <label htmlFor="year-input">Year</label>
            <input
              required
              type="number"
              name="year"
              id="year-input"
              value={formData.year}
              onChange={handleChange}
            />

            <button type="submit">SUBMIT</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MovieForm;
