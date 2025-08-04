import type { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Home', icon: 'pi pi-fw pi-home' },
  { label: 'Profile', icon: 'pi pi-fw pi-user' },
  { label: 'Settings', icon: 'pi pi-fw pi-cog' },
];

type HomePageLayoutProps = {
  currentUser: User | null; // Adjust the type as needed
};

const HomePage: React.FC<HomePageLayoutProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      <h1>This is home page for Ads</h1>
      <h1>
        {currentUser
          ? `Welcome, ${currentUser.displayName || currentUser.email || 'User'}!`
          : 'Not signed in'}
      </h1>
    </div>
  );
};

export default HomePage;
