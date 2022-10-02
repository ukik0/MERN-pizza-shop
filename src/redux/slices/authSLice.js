import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios.js';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ email, password }) => {
  const { data } = await axios.post('/auth/login', { email, password });

  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async ({ email, password }) => {
  const { data } = await axios.post('/auth/register', { email, password });

  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
});

export const fetchAddCart = createAsyncThunk(
  'auth/fetchAddCart',
  async ({ title, types, sizes, price, category, rating }) => {
    try {
      const { data } = await axios.post('/cart/create', {
        title,
        types,
        sizes,
        price,
        category,
        rating,
      });

      return data;
    } catch (error) {
      return error;
    }
  },
);

export const fetchDelete = createAsyncThunk('cart/fetchDelete', async (id) => {
  try {
    const { data } = await axios.delete(`/cart/remove/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddPizzaCounter = createAsyncThunk('pizzas/fetchAddPizzaCounter', async (id) => {
  const { data } = await axios.patch(`/cart/inc/${id}`);
  return data;
});

export const fetchRemovePizzaCounter = createAsyncThunk('pizzas/fetchRemovePizzaCounter', async (id) => {
  const { data } = await axios.patch(`/cart/dec/${id}`);
  return data;
});



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'loading',
    message: '',
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loading';
    },
  },
  extraReducers: {
    //FetchLogin
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.message = 'Такого пользователя нет или данные указаны неверно';
    },
    //FetchMe
    [fetchMe.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchMe.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    //fetchRegister
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.message = 'Такой пользоваетль есть или енверный формат данных';
    },
    //fetchAddCart
    [fetchAddCart.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddCart.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data.cart.push(action.payload.cartProduct);
    },
    [fetchAddCart.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    //fetchDelete
    [fetchDelete.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDelete.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data.cart = state.data.cart.filter(
        (item) => item._id !== action.payload.cartProduct._id,
      );
    },
    [fetchDelete.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    //fetchAddPizzaCounter
    [fetchAddPizzaCounter.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddPizzaCounter.fulfilled]: (state, action) => {
      const findPizza = state.data.cart.find((item) => item._id === action.meta.arg)

      if (findPizza) {
        findPizza.counter++
      }

      state.status = 'loaded';
      
    },
    [fetchAddPizzaCounter.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    //fetchRemovePizzaCounter
    [fetchRemovePizzaCounter.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchRemovePizzaCounter.fulfilled]: (state, action) => {
      const findPizza = state.data.cart.find((item) => item._id === action.meta.arg)

      if (findPizza) {
        findPizza.counter--
      }

      state.status = 'loaded';
      
    },
    [fetchRemovePizzaCounter.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
  },
});

export const checkIsAuth = (state) => !!state.auth.data;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
