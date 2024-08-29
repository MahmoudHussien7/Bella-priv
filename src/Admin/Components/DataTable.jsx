import { MdDelete, MdEdit } from 'react-icons/md';

const DataTable = ({ columns, data }) => {
  return (
    <div>
      <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider ${
                      col.responsive ? col.responsive : ''
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.responsive}`}>
                      {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button className="text-white bg-blue-400 rounded p-1">
                      <MdEdit className="size-6" />
                    </button>
                    <button className="text-white bg-red-500 rounded p-1">
                      <MdDelete className="size-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
