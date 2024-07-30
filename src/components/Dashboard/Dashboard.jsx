import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <div class="outer-container">
        <div class="main-container">
          <h1>Welcome, {user.username}</h1>
          <p>
            This is the dashboard page where you, and only you, can see a dashboard
            of all of your things.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
