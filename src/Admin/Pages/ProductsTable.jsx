import DataTable from '../Components/DataTable';
import HeaderWithSubPath from '../Components/HeaderWithSubPath';

const productsData = [
  {
    name: 'Product 1',
    category: 'Category 1',
    price: '$25.00',
    stock: 50,
  },
  {
    name: 'Product 2',
    category: 'Category 2',
    price: '$30.00',
    stock: 20,
  },
];

const productColumns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Category', accessor: 'category', responsive: 'hidden sm:table-cell' },
  { header: 'Price', accessor: 'price', responsive: 'hidden sm:table-cell' },
  { header: 'Stock', accessor: 'stock', responsive: 'hidden lg:table-cell' },
];

const ProductsTable = () => {
  return (
    <div>
      <HeaderWithSubPath title="Products" />
      <DataTable  columns={productColumns} data={productsData} />
    </div>
  );
};

export default ProductsTable;
