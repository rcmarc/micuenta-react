import Avatar from '../components/avatar/Avatar';
import MainLayout from '../layouts/MainLayout';
import { useUserData } from '../hooks/user';
import { getUser } from '../lib/user';

function Profile() {
  const user = useUserData();
  return (
    <div className="mx-auto mt-5 w-11/12 sm:w-10/12 md:mt-3 md:ml-8 md:mr-auto md:w-9/12 lg:w-7/12">
      <div className="flex justify-center rounded-lg bg-slate-200 py-2 pl-5 pr-10 md:w-8/12 md:justify-start xl:w-6/12">
        <Avatar size={'lg'} className="mr-5" />
        <div className="flex flex-col justify-center">
          <p>{user.name}</p>
          <p className="font-semibold text-slate-600">{user.email}</p>
        </div>
      </div>
      <div className="[&>div]:mt-5">
        <Group
          groupName="Información de Contacto"
          user={user}
          fields={CONTACT_FIELDS}
        />
        <Group
          groupName="Información de la Universidad"
          user={user}
          fields={UNIVERSITY_FIELDS}
        />
      </div>
    </div>
  );
}

function Group({ fields, user, groupName }) {
  const fieldsFiltered = fields.filter((f) => user[f]);
  if (fieldsFiltered.length > 0) {
    return (
      <div className="flex flex-col rounded-lg border-2 py-2 [&>div]:px-5 [&>p]:px-5">
        <p className="text-lg font-bold tracking-wide text-slate-600">
          {groupName}
        </p>
        <span className="mx-1 border-t border-slate-400" />
        <div className="mt-2">
          <ul className="xs:grid-cols-2 grid gap-y-5 gap-x-10">
            {fieldsFiltered.map((field, index) => (
              <li key={index}>
                <p className={`text-sm font-semibold text-slate-500 `}>
                  {FIELD_MAP[field]}:
                </p>
                <p className="ml-2">{user[field]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const CONTACT_FIELDS = [
  'country',
  'state',
  'city',
  'telephoneNumber',
  'address',
  'ic',
];

const UNIVERSITY_FIELDS = ['department', 'area', 'title'];

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

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  return {
    props: { user },
  };
};
