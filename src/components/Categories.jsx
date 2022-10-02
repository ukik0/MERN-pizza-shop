import React from 'react';

const CategoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({activeCategory, setActiveCategory}) => {

  return (
    <div className="categories">
      <ul>
        {CategoryList.map((category, idx) => (
          <li
            onClick={() => setActiveCategory(idx)}
            className={activeCategory === idx ? 'active' : ''}
            key={category}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
