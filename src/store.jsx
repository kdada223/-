import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.jsx';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let item = createSlice({
  name: 'item',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],

  reducers: {
    increaseCount(state, action) {
      let id = action.payload;
      let item = state.find((item) => item.id === id);

      if (item) {
        item.count++;
      }
    },
  },
});

export let { increaseCount } = item.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    item: item.reducer,
  },
});
