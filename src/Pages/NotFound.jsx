import React from 'react';
import { Link } from 'react-router-dom';

import emptyCart from '../assets/img/empty-cart.png';

const NotFound = () => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Данной страницы не существует!
            <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не перешли не на тот адрес.
            <br />
            Для того, чтобы вернуться к пиццам, перейди на главную страницу.
          </p>
          <img src={emptyCart} alt="empty-cart" />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
