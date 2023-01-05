import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaAngleRight } from 'react-icons/fa';
import HelpList from '../../components/HelpList';
import HelpListItem from '../../components/HelpListItem';
import Responsive from '../../components/Responsive';
import { useDateLocale, useLdapToDate, useUserData } from '../../hooks';

import MainLayout from '../../layouts/MainLayout';
import { getUser } from '../../lib/user';

const ActionContainer = ({ children }) => (
  <div className="flex cursor-pointer justify-between rounded-lg bg-slate-200 p-6 transition-[background-color_box-shadow] hover:bg-slate-300 hover:shadow-md active:bg-slate-200">
    {children}
  </div>
);

const ActionText = ({ children }) => (
  <p className="font-semibold text-slate-600">{children}</p>
);

const ActionCenterText = ({ children }) => (
  <p className="ml-12 mr-auto font-semibold tracking-widest text-slate-500">
    {children}
  </p>
);

const Action = ({ title, centerText, href, children }) => (
  <li>
    <Link href={href}>
      <ActionContainer>
        <ActionText>{title}</ActionText>
        {centerText && <ActionCenterText>{centerText}</ActionCenterText>}
        <FaAngleRight size={20} className="mt-1 text-slate-600" />
      </ActionContainer>
    </Link>
    {children}
  </li>
);

const ActionList = ({ children }) => (
  <ul className="[&>li]:mb-5">{children}</ul>
);

const ChangePasswordAction = () => {
  const router = useRouter();
  const user = useUserData();
  const dateLocale = useDateLocale();
  const ldapToDate = useLdapToDate();

  const pwdLastSet = dateLocale(ldapToDate(user.pwdLastSet));
  const pwdExpirationDate = dateLocale(ldapToDate(user.pwdExpirationDate));
  return (
    <Action
      href={router.pathname + '/changepwd'}
      title="Contraseña"
      centerText={'*'.repeat(10)}
    >
      <HelpList>
        <HelpListItem>
          Su contraseña fue cambiada por última vez el{' '}
          <span className="font-semibold">{pwdLastSet}</span>
        </HelpListItem>
        <HelpListItem>
          Su contraseña expira el{' '}
          <span className="font-semibold">{pwdExpirationDate}</span>
        </HelpListItem>
      </HelpList>
    </Action>
  );
};

const SecurityQuestionsAction = () => {
  const router = useRouter();
  return (
    <Action
      href={router.pathname + '/questions'}
      title="Preguntas de Seguridad"
    />
  );
};

function Security() {
  return (
    <ActionList>
      <ChangePasswordAction />
      <SecurityQuestionsAction />
    </ActionList>
  );
}

Security.getLayout = (page) => (
  <MainLayout>
    <Responsive>{page}</Responsive>
  </MainLayout>
);

export default Security;

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  return { props: { user } };
};
