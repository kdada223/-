import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kang', age: 20 },

  reducers: {
    changeName(state) {
      state.name = 'Park';
    },
    changeAge(age, action) {
      age.age += action.payload;
    },
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
