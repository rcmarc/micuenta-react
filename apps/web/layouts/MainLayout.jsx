import ProgressBar from '../components/ProgressBar';
import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';

function MainLayout({ children }) {
  return (
    <>
      <ProgressBar />
      <TopBar />
      <div className="flex flex-col md:mt-5 md:flex-row">
        <SideNav className={'md:w-4/12 md:flex-col lg:w-3/12 xl:w-2/12'} />
        {children}
      </div>
    </>
  );
}

export default MainLayout;
