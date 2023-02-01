import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaAngleRight } from 'react-icons/fa';

import HelpList from '../../components/HelpList';
import HelpListItem from '../../components/HelpListItem';
import Responsive from '../../components/Responsive';
import MainLayout from '../../layouts/MainLayout';
import { useDateLocale, useLdapToDate } from '../../hooks/date';
import { useUserData } from '../../hooks/user';
import { getUser } from '../../lib/user';

function Security() {
  return (
    <ul className="[&>li]:mb-5">
      <ChangePasswordAction />
      <SecurityQuestionsAction />
    </ul>
  );
}

function ChangePasswordAction() {
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
}

function SecurityQuestionsAction() {
  const router = useRouter();
  return (
    <Action
      href={router.pathname + '/questions'}
      title="Preguntas de Seguridad"
    />
  );
}

function Action({ title, centerText, href, children }) {
  return (
    <li>
      <Link href={href}>
        <div className="flex cursor-pointer justify-between rounded-lg bg-slate-200 p-6 transition-[background-color_box-shadow] hover:bg-slate-300 hover:shadow-md active:bg-slate-200">
          <p className="font-semibold text-slate-600">{title}</p>
          {centerText && (
            <p className="ml-12 mr-auto font-semibold tracking-widest text-slate-500">
              {centerText}
            </p>
          )}
          <FaAngleRight size={20} className="mt-1 text-slate-600" />
        </div>
      </Link>
      {children}
    </li>
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
