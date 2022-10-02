import React from 'react';


import { useState } from 'react';

import cl from './Pagination.module.scss';

const Pagination = ({ activeCategory, pizzasLength, page, setPage }) => {

  const [pageIdx, setPageIdx] = useState(0);
  const pagesArray = [];

  if (activeCategory === 0) {
    for (let i = 0; i <= Math.floor(pizzasLength / 4); i++) {
      pagesArray.push(i + 1);
    }
  } else {
    for (let i = 0; i < 0 / 4; i++) {
      pagesArray.push(i + 1);
    }
  }

  const pageHandler = (idx) => {
    setPageIdx(idx);
    setPage(idx);
  };

  return (
    <div className={cl.wrapper}>
      {pagesArray.map((item, idx) => (
        <button
          key={item}
          onClick={() => pageHandler(idx)}
          className={`${cl.btn} ${pageIdx === idx ? cl.actvie : ''}`}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
