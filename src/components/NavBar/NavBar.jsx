import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <div className="default-nav-bar">
          <Link className="nav-link" to='/'>HOME</Link>
          <Link className="nav-link" to='/movies'>Movies</Link>
          <Link className="nav-link" to="/movies/new">Add Movie</Link>
          <Link className="nav-link" to='/users'>Community Page</Link>
          <Link className="nav-link" to='' onClick={handleSignout}>SIGN OUT</Link>
        </div>
      ) : (
        <div className="default-nav-bar">
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
