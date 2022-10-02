import React, { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { toast } from 'react-toastify';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/Skeletons/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import { motion } from 'framer-motion';

import emptyCart from '../assets/img/empty-cart.png';

const Home = () => {
  const dispatch = useDispatch();
  const allPizzasLength = useSelector((state) => state?.pizza?.pizzas?.allPizzas);
  const pizzas = useSelector((state) => state?.pizza?.pizzas?.cat);
  const inputValue = useSelector((state) => state?.pizza?.inputValue);
  const { loading } = useSelector((state) => state?.pizza);

  const [activeCategory, setActiveCategory] = useState(0);
  const [SortedCategory, setSortedCategory] = useState({
    name: 'rating',
    sortProperty: 1,
    fullName: 'Популярности',
  });
  const property = SortedCategory.sortProperty;

  const [page, setPage] = useState(0);
  const props = { ...SortedCategory, activeCategory, page };

  useEffect(() => {
    dispatch(fetchPizzas(props));
    toast('Успешно выполненно!');
  }, [activeCategory, dispatch, property, SortedCategory, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort SortedCategory={SortedCategory} setSortedCategory={setSortedCategory} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <motion.div
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{type: 'tween', duration: 1.5, }}
      className="content__items">
        {loading === 'loading'
          ? [...new Array(8)].map((_, idx) => <PizzaSkeleton key={idx} />)
          : pizzas
              ?.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
              .map((pizza, idx) => <PizzaBlock pizza={pizza} key={pizza._id} />)}
      </motion.div>
      {pizzas?.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
        .length !== 0 ? (
        <Pagination
          activeCategory={activeCategory}
          pizzasLength={allPizzasLength?.length}
          setPage={setPage}
        />
      ) : (
        <div class="content">
          <div class="container container--cart">
            <div class="cart cart--empty">
              <h2>
                Мы не нашли ни одной пиццы!
                <icon>😕</icon>
              </h2>
              <p>
                Вероятней всего, вы указали неправильное название пиццы.
                <br />
                Или она отсутствует в нашем каталоге
              </p>
              <img src={emptyCart} alt="empty-cart" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
