import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import MovieList from './components/MovieList/MovieList';
import * as movieService from './services/movieService';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm';
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [movies, setMovies] = useState([])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      const moviesData = await movieService.index();
      setMovies(moviesData)
    };
    if (user) fetchAllMovies();
  }, [user]);

  const navigate = useNavigate();

  const handleAddMovie = async (movieFormData) => {
   const newMovie = await movieService.create(movieFormData);
   setMovies([newMovie, ...movies]);
    navigate('/movies');
  };
  

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/movies" element={<MovieList movies={movies} />} />
      <Route path="/movies/:movieId" element={<MovieDetails />} />
      <Route path="/:movies/new" element={<MovieForm handleAddMovie={handleAddMovie} />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
