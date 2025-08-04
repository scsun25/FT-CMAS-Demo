import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../features/auth/firebase';

const menuItems = [
  { label: 'Home', icon: 'pi pi-fw pi-home', url: '/' },
  { label: 'Patients', icon: 'pi pi-fw pi-users', url: '/patient' },
  // Add more items as needed
];

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  // Hook
  const { user } = useAuth();
  // State
  const [visibleLeft, setVisibleLeft] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
        {user?.displayName !== undefined ? (
          <Menubar
            model={menuItems}
            className="!rounded-none"
            end={
              user ? (
                <>
                  <Sidebar
                    header={<h2>{`Welcome ${user?.displayName}`}</h2>}
                    visible={visibleLeft}
                    position="right"
                    onHide={() => setVisibleLeft(false)}
                  >
                    <Button
                      icon="pi pi-address-book"
                      text
                      severity="secondary"
                      label="Subscription"
                      className="w-full"
                      onClick={async () => {
                        alert('haha idiot ~~ I am not gonna tell you XDDDD');
                      }}
                    />
                    <Button
                      icon="pi pi-sign-out"
                      text
                      severity="secondary"
                      label="Logout"
                      className="w-full"
                      onClick={async () => {
                        await auth.signOut();
                        navigate('/login');
                      }}
                    />
                    <Button
                      icon="pi pi-question-circle"
                      text
                      severity="secondary"
                      label="Help"
                      className="w-full"
                      onClick={async () => {
                        alert('haha idiot ~~ who bird you XDDDD');
                      }}
                    />
                  </Sidebar>
                  <Button rounded icon="pi pi-user" onClick={() => setVisibleLeft(true)} />
                </>
              ) : (
                <></>
              )
            }
          />
        ) : (
          <>
            <style>{`.p-menubar-button { display: none !important; } .p-menubar-mobile-active { background: none !important; }`}</style>
            <Menubar start={<p className="pl-2">Welcome to CMAS</p>}></Menubar>
          </>
        )}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
