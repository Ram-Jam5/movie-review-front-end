import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as authService from '../../services/authService';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const { userId } = useParams();
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await authService.getUserProfile(userId);
                setProfile(profileData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, [userId]);

    if (!profile) {
      return <div>Loading...</div>
    }

    return (
      <div className="outer-container">
        <div className="main-container">
          <main>
            <h1>{profile.username}'s Profile</h1>
            <br></br>
            <br></br>
            <h2>Reviews</h2>
              {profile.userReviews.map((userReview) => (
                <div key={userReview._id} className="outer-container">
                  <Link to={`/movies/${userReview.movieId}/${userReview._id}`}>
                    <h3>{userReview.title}</h3>

                    <h4>{userReview.text}</h4>
                  </Link>
                </div>
              ))}
            <br></br>
          </main>
        </div>
      </div>
)};

export default UserProfile;
