import React, { useCallback } from 'react';
import { useState } from 'react';

import debounce from 'lodash.debounce';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { checkIsAuth, logout } from '../redux/slices/authSLice';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../redux/slices/pizzaSlice';

import { motion } from 'framer-motion';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const cart = useSelector((state) => state.auth?.data);

  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',
    },
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    debounceInput(e.target.value);
  };

  const debounceInput = useCallback(
    debounce((str) => {
      dispatch(setInput(str));
    }, 500),
    [],
  );

  const clickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    toast.success('Выход успешно выполнен');
    navigate('/');
  };

  const getSizes = (size) => {
    if (size === 0) {
      return Number(26);
    } else if (size === 1) {
      return Number(30);
    } else {
      return Number(40);
    }
  };

  return (
    <motion.div
    initial={{x: -100, opacity: 0}}
    animate={{x: 0, opacity: 1}}
    exit={{opacity: 0, x: 100}}
    transition={{type: 'tween', duration: 1}}
    className="header">
      <div className="container">
        <div className="header__logo">
          <Link to={'/'}>
            <div className="container-item">
              <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="item">
                <motion.path
                  d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: 'easeInOut' },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
            </div>
          </Link>
          <motion.div
            initial={{scale: 0.9, opacity: 0}}
            animate={{  scale: 1, opacity: 1 }}
            transition={{
              type: "tween",
              stiffness: 260,
              damping: 20,
              duration: 3
            }}
          >
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </motion.div>
        </div>

        {pathname === '/cart' || pathname === '/login' || pathname === '/register' ? null : (
          <input
            value={value}
            onChange={onChangeInput}
            type="text"
            className="header__input"
            placeholder="Название пиццы"
          />
        )}

        {pathname !== '/cart' && isAuth ? (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>
                {isAuth
                  ? cart?.cart?.reduce(
                      (acc, el) => (acc += Number(el.price) + getSizes(el.sizes[0])),
                      0,
                    ) *
                      (cart?.cart?.reduce((acc, el) => (acc += el.counter), 0) /
                        cart?.cart?.length) || 0
                  : 0}{' '}
                ₽
              </span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{isAuth ? cart?.cart?.reduce((acc, el) => (acc += el.counter), 0) : 0}</span>
            </Link>

            <button className="auth__btn" onClick={clickLogout}>
              Выйти
            </button>
          </div>
        ) : !isAuth ? (
          <Link to={'/login'}>
            <button className="auth__btn">Войти</button>
          </Link>
        ) : (
          <button onClick={clickLogout} className="auth__btn">
            Выйти
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
