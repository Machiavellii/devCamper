import React from "react";

const Pagination = ({ contentsPerPage, totalContent, paginate }) => {
  const contentNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContent / contentsPerPage); i++) {
    contentNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {contentNumbers.map((number) => (
          <li key={number} className="page-item">
            <span
              onClick={() => paginate(number)}
              className="page-link"
              style={{ cursor: "pointer" }}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
