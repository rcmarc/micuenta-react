import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';

function MainLayout({ children }) {
  return (
    <>
      <TopBar />
      <SideNav />
      {children}
    </>
  );
}

export default MainLayout;
