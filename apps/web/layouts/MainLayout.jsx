import ProgressBar from '../components/ProgressBar';
import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';

function MainLayout({ children }) {
  return (
    <>
      <ProgressBar />
      <TopBar />
      <div className="mt-5 flex">
        <SideNav className={'w-2/12'} />
        {children}
      </div>
    </>
  );
}

export default MainLayout;
