import HCenter from '../components/HCenter';
import FullScreenGradient from '../components/FullScreenGradient';
import Logo from '../components/Logo';
import LogoText from '../components/LogoText';
import IndeterminateProgressBar from '../components/IndeterminateProgressBar';
import { useLoading } from '../hooks/loading';

const FormContainer = ({ children }) => {
  return (
    <div className="xs:h-full xs:w-9/12 xs:rounded-lg relative h-screen w-full overflow-hidden bg-slate-50 py-10 px-[5%] shadow-lg shadow-sky-800 sm:w-7/12 sm:px-14 md:w-5/12 md:px-10 lg:w-4/12 xl:w-3/12">
      {children}
    </div>
  );
};

function FormOnlyLayout({ children, helperText }) {
  const { loading } = useLoading();
  return (
    <FullScreenGradient>
      <HCenter className="xs:pt-20">
        <FormContainer>
          <HCenter>
            <Logo />
          </HCenter>
          <HCenter>
            <p className="pr-2 pt-0.5 text-xl text-slate-500">MiCuenta</p>
            <LogoText />
          </HCenter>
          <HCenter className="mt-3">
            <p className="text-sm">{helperText}</p>
          </HCenter>
          <HCenter className="mt-10">
            {loading && <IndeterminateProgressBar />}
            {children}
          </HCenter>
        </FormContainer>
      </HCenter>
    </FullScreenGradient>
  );
}

export default FormOnlyLayout;
