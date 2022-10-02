import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ activeCategory, name, sortProperty, page }) => {
    try {
      const { data } = await axios.get(
        `/pizzas/getAll?category=${activeCategory}&${name}=${sortProperty}&page=${page}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);



export const fetchPizza = createAsyncThunk('pizzas/fetchPizza', async (id) => {
  try {
    const { data } = await axios.get(`/pizzas/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState: {
    pizzas: [],
    pizza: [],
    loading: 'loading',
    message: null,
    inputValue: '',
  },
  reducers: {
    setInput: (state, action) => {
      state.inputValue = action.payload;
    },
  },
  extraReducers: {
    //Fetch Pizzas
    [fetchPizzas.pending]: (state) => {
      state.pizzas = [];
      state.loading = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.loading = 'loaded';
    },
    [fetchPizzas.pending]: (state) => {
      state.pizzas = [];
      state.loading = 'loading';
    },

    //Fetch Pizza
    [fetchPizza.pending]: (state) => {
      state.pizza = [];
      state.loading = 'loading';
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.pizza = action.payload;
      state.loading = 'loaded';
    },
    [fetchPizza.pending]: (state) => {
      state.pizza = [];
      state.loading = 'loading';
    },
  },
});

export const { setInput } = pizzaSlice.actions;

export default pizzaSlice.reducer;
