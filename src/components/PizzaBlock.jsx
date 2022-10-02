import React from 'react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchAddCart } from '../redux/slices/authSLice';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import {motion} from 'framer-motion'

const PizzaBlock = ({ pizza }) => {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(0);
  const [activeSort, setActiveSort] = useState(0);
  const isAuth = useSelector(checkIsAuth);

  const addPizza = () => {
    dispatch(fetchAddCart({...pizza, types: activeType, sizes: activeSort}));
    toast.success('Пицца добавлена в корзину!')
  };

  return (
    <div className="content__items">
      <motion.div whileHover={{scale: 1.1}} whileTap={{ opacity: .8}} className="pizza-block">
        <Link to={`/pizza/${pizza._id}`}>
          <img className="pizza-block__image" src={pizza.imageUrl} alt={pizza.title} />
        </Link>
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {pizza.types.map((type, idx) => (
              <li
                onClick={() => setActiveType(idx)}
                className={activeType === idx ? 'active' : ''}
                key={type}>
                {type === '1' ? 'тонкое' : 'традиционное'}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size, idx) => (
              <li
                onClick={() => setActiveSort(idx)}
                className={activeSort === idx ? 'active' : ''}
                key={size}>
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₽</div>
          <button
            onClick={addPizza}
            disabled={isAuth ? false : true}
            className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span onClick={isAuth ? null : () => toast.error('Необходима авторизация')}>Добавить</span>
            <i>{pizza.counter || 1}</i>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PizzaBlock;
