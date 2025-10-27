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
			// 특정 아이템 즉 내가 뺴고 있는 아이템

			if (items !== -1) {
				//아 findIndex는 아이템을 찾지 못하면 -1을 반환하기에 -1이 아니면 이라는 뜻은 
				//아이템을 찾았으면 그 아이템의 카운트를 빼라
				//그런데 그 아이템의 카운트가 0보다 작거나 0이면
				//제거를 하고 splice 즉 그 (그 아이템, 하나)를 제거해줘라 
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
