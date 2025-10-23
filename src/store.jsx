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
		addItem(state, action) {
			let existingItem = state.find((item) => item.id === action.payload.id);

			if (existingItem) {
				alert('이미 장바구니에 있는 상품입니다. 수량이 추가 되었습니다.');
				existingItem.count++;
				return;
			} else {
				state.push(action.payload);
				alert(`${action.payload.name}가 장바구니에 추가 되었습니다.`);
			}
		},
		reMoveItem(state, action) {
			let id = action.payload;
			let items = state.findIndex((item) => item.id === id);

			if (items !== -1) {
				state[items].count--;
				if (state[items].count <= 0) {
					alert('제거');
					state.splice(items, 1);
				}
			}
		},
		deleteItem(state, action) {
			return state.filter((item) => item.id !== action.payload);
		},
	},
});

export let { increaseCount, addItem, deleteItem, reMoveItem } = item.actions;

export default configureStore({
	reducer: {
		user: user.reducer,
		stock: stock.reducer,
		item: item.reducer,
	},
});
