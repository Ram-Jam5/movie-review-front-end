import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieService from '../../services/movieService'

const MovieDetails = (props) => {
    const { movieId } = useParams();
    console.log('movieId', movieId);

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
          const movieData = await movieService.show(movieId);
          console.log('movieData', movieData);
          setMovie(movieData);
        };
        fetchMovie();
      }, [movieId]);
      
      console.log('movie state:', movie);

      if (!movie) return <main>Loading...</main>;
    return <main>
    <header>
      <p>{movie.category.toUpperCase()}</p>
      <h1>{movie.title}</h1>
      <p>
        {movie.author.username} posted on
        {new Date(movie.createdAt).toLocaleDateString()}
      </p>
    </header>
    <p>{movie.text}</p>
    <section>
  <h2>Comments</h2>

  {!movie.comments.length && <p>There are no comments.</p>}

  {movie.comments.map((comment) => (
    <article key={comment._id}>
      <header>
        <p>
          {comment.author.username} posted on
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{comment.text}</p>
    </article>
  ))}
</section>
  </main>
};

export default MovieDetails;