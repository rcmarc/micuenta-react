import Avatar from '../components/Avatar';
import { useUserData } from '../hooks';
import MainLayout from '../layouts/MainLayout';
import { getUser } from '../lib/user';

const CONTACT_FIELDS = [
  'country',
  'state',
  'city',
  'telephoneNumber',
  'address',
  'ic',
];

const UNIVERSITY_FIELDS = ['department', 'area', 'title'];

function Profile() {
  const user = useUserData();
  return (
    <ProfileContainer>
      <ProfileCard
        userEmail={user.email}
        userFullName={`${user.firstName} ${user.lastName}`}
      />
      <div className="[&>div]:mt-5">
        <GroupInfo
          groupName="Información de Contacto"
          user={user}
          fields={CONTACT_FIELDS}
        />
        <GroupInfo
          groupName="Información de la Universidad"
          user={user}
          fields={UNIVERSITY_FIELDS}
        />
      </div>
    </ProfileContainer>
  );
}

const FIELD_MAP = {
  city: 'Municipio',
  state: 'Provincia',
  telephoneNumber: 'Teléfono',
  address: 'Dirección',
  country: 'País',
  ic: 'Carnet',
  department: 'Departamento',
  area: 'Area',
  title: 'Título',
};

function GroupInfo({ fields, user, groupName }) {
  const fieldsFiltered = fields.filter((f) => user[f]);
  if (fieldsFiltered.length > 0) {
    return (
      <Group groupName={groupName}>
        <Info fields={fieldsFiltered} user={user} />
      </Group>
    );
  }
}

function Info({ user, fields }) {
  return (
    <ul className="xs:grid-cols-2 grid gap-y-5 gap-x-10">
      {fields.map((field, index) => (
        <li key={index}>
          <p className={`text-sm font-semibold text-slate-500 `}>
            {FIELD_MAP[field]}:
          </p>
          <p className="ml-2">{user[field]}</p>
        </li>
      ))}
    </ul>
  );
}

function Group({ groupName, children }) {
  return (
    <div className="flex flex-col rounded-lg border-2 py-2 [&>div]:px-5 [&>p]:px-5">
      <p className="text-lg font-bold tracking-wide text-slate-600">
        {groupName}
      </p>
      <span className="mx-1 border-t border-slate-400" />
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ProfileContainer({ children }) {
  return <div className="xs:px-10 py-5 px-4">{children}</div>;
}

function ProfileCard({ userFullName, userEmail }) {
  return (
    <div className="xs:w-9/12 flex rounded-lg bg-slate-200 py-2 pl-5 pr-10 sm:w-8/12">
      <Avatar size={'lg'} className="mr-5" />
      <div className="flex flex-col justify-center">
        <p>{userFullName}</p>
        <p className="font-semibold text-slate-600">{userEmail}</p>
      </div>
    </div>
  );
}

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  return {
    props: { user },
  };
};
