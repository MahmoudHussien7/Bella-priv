import DataTable from '../Components/DataTable';
import HeaderWithSubPath from '../Components/HeaderWithSubPath';

const usersData = [
  {
    name: 'Anthony Leannon',
    phone: '092300940',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinDate: '11-09-2020',
    position: 'User',
    gender: 'Male',
    age: 25,
  },
  {
    name: 'Leann Blanda',
    phone: '092300940',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinDate: '11-09-2020',
    position: 'User',
    gender: 'Female',
    age: 32,
  },
];

const userColumns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (name, user) => (
      <div className="flex items-center">
        <img src={user.image} alt={name} className="w-10 h-10 rounded-full" />
        <div className="ml-3">
          <div className="text-sm font-medium font-montserrat text-mainColor">{name}</div>
          <div className="text-xs text-gray-600">{user.phone}</div>
        </div>
      </div>
    ),
  },
  { header: 'Join Date', accessor: 'joinDate', responsive: 'hidden sm:table-cell' },
  { header: 'Position', accessor: 'position', responsive: 'hidden sm:table-cell' },
  { header: 'Gender', accessor: 'gender', responsive: 'hidden lg:table-cell' },
  { header: 'Age', accessor: 'age', responsive: 'hidden lg:table-cell' },
];

const Users = () => {
  return (
    <div>
      <HeaderWithSubPath title="Users" />
      <DataTable columns={userColumns} data={usersData} />
    </div>
  );
};

export default Users;
