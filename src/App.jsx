import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; 
import MovieList from './components/MovieList/MovieList';
import * as movieService from './services/movieService';
// import * as reviewService from './services/reviewService';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieForm from './components/MovieForm/MovieForm';
import ReviewDetails from './components/ReviewDetails/ReviewDetails';

// import ReviewList from './components/ReviewList/ReviewList';

import CommunityPage from './components/CommunityPage/CommunityPage';
import UserProfile from './components/UserProfile/UserProfile';
import CommentForm from './components/CommentForm/CommentForm';

export const AuthedUserContext = createContext(null);


const App = () => {
  const [user, setUser] = useState(authService.getUser()); 

  const [movies, setMovies] = useState([]);

  const [users, setUsers] = useState([]);

  //const [reviews, setReviews] = useState([]);

  // const [reviews, setReviews] = useState([]);

  

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


  // reviews useEffect
  // useEffect(() => {
  //   const fetchAllReviews = async () => {
  //     const reviewsData = await reviewService.index(movieId);
  //     setReviews(reviewsData);
  //   };
  //   if (user) fetchAllReviews();
  // }, [user])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const usersData = await authService.getAllUsers();
      setUsers(usersData);
    };
    if (user) fetchAllUsers();
  }, [user]);


  const navigate = useNavigate();

  const handleAddMovie = async (movieFormData) => {
   const newMovie = await movieService.create(movieFormData);
   setMovies([...movies, newMovie]);
    navigate('/movies');
  };
  
  const handleDeleteMovie = async (movieId) => {
    const deletedMovie = await movieService.deleteMovie(movieId);
    setMovies(movies.filter((movie) => movie._id !== deletedMovie._id));
    navigate('/movies');
  };

  const handleUpdateMovie = async (movieId, movieFormData) => {
    const updatedMovie = await movieService.update(movieId, movieFormData);
  
    setMovies(movies.map((movie) => (movieId === movie._id ? updatedMovie : movie)));
  
    navigate(`/movies/${movieId}`);
  };
  const handleUpdateComment = async (movieId, reviewId, commentId, CommentFormData) => {
    try {
      await movieService.updateComment(movieId, reviewId, CommentFormData);
    } catch (error) {
      console.log('error:', error)
    }
  }
  return (
    <>
        <AuthedUserContext.Provider value={user}>
          <NavBar user={user} handleSignout={handleSignout} />
          <div className="outer-container">
          <Routes>
  {user ? (
    // Protected Routes:
    <>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/movies" element={<MovieList movies={movies} />} />
        <Route path="/movies/new" element={<MovieForm handleAddMovie={handleAddMovie} />} />


        <Route path="/movies/:movieId/:reviewId" element={<ReviewDetails  />} />
        <Route path='/movies/:movieId/:reviewId/comments/:commentId/edit' element={<CommentForm handleUpdateComment={handleUpdateComment} />}/>

        {/* <Route path="/movies/:movieId" element={<ReviewList reviews={reviews}/>} /> */}

        <Route path="/movies/:movieId" element={<MovieDetails user={user} handleDeleteMovie={handleDeleteMovie} />} />

        <Route path="/movies/:movieId/edit" element={<MovieForm handleUpdateMovie={handleUpdateMovie} />} />
        <Route path="/users" element={<CommunityPage users={users}/>} />
        <Route path="/users/:userId" element={<UserProfile />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
      </div>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
