import React from "react";

const Pagination = ({ contentsPerPage, totalContent, paginate }) => {
  const contentNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContent / contentsPerPage); i++) {
    contentNumbers.push(i);
  }

  console.log(contentNumbers);

  return (
    <nav>
      <ul className="pagination">
        {contentNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
