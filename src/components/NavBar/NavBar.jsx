import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <div class="default-nav-bar">
          <Link to='/'>HOME</Link>
          <Link to='/movies'>Movies</Link>
          <Link to="/movies/new">Add Movie</Link>
          <Link to='' onClick={handleSignout}>SIGN OUT</Link>
        </div>
      ) : (
        <div class="default-nav-bar">
          <nav>
            <ul>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
export default NavBar;
