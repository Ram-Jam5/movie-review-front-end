import { Link } from 'react-router-dom';

const CommunityPage = (props) => {
    return (
      <div className="outer-container">
        <div className="main-container">
          <main>
            {props.users.map((user) => (
              <Link style={{color: 'white'}} key={user._id} to={`/users/${user._id}`}>
                <article>
                  <header>
                    <h2>{user.username}</h2>
                  </header>
                </article>
                <br></br>
              </Link>
            ))}
          </main>
        </div>
      </div>
    )
};

export default CommunityPage;