import type { User } from 'firebase/auth';
import { Menubar } from 'primereact/menubar';

const menuItems = [
  { label: 'Home', icon: 'pi pi-fw pi-home' },
  { label: 'Profile', icon: 'pi pi-fw pi-user' },
  { label: 'Settings', icon: 'pi pi-fw pi-cog' },
];

type HomePageLayoutProps = {
  currentUser: User | null; // Adjust the type as needed
};

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ currentUser }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      <Menubar model={menuItems} className="!rounded-none" />

      <h1 className="text-4xl font-bold text-gray-800">
        {'Welcome to the Home Page ' + JSON.stringify(currentUser?.displayName)}
      </h1>
    </div>
  );
};

export default HomePageLayout;
