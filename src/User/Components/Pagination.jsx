// eslint-disable-next-line react/prop-types
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mx-1  ${
              currentPage === number ? " text-mainColor" : "bg-transparent"
            } px-3 py-1 rounded my-5`}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
