import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeAge, changeName } from '../store/userSlice.jsx';
import { increaseCount } from '../store.jsx';

function Cart() {
  //useSelector에서 익명함수 안의 state는 store안에 있는 모든 state를 뜻한다.
  //그리고 나서 return state는 모든 state를 내보낸다는 뜻이지만 여기서 state.user 한 후 변수에 저장하면 그 변수에는 user에 대한 값만
  //들어있다.
  //그리고 redux를 쓸 때 주의할 점이 모든 state들을 store에 집어넣을 필요가 없음. 만약에 특정 컴포넌트 안에서만 쓰는 state면 그냥 거기서 만들면 됨
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();

  return (
    <div>
      <div>
        {state.user.name}의 장바구니{state.user.age}
      </div>
      <button
        onClick={() => {
          dispatch(changeAge(100));
          dispatch(changeName());
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <Inventory />
        </tbody>
      </Table>
    </div>
  );
}

function Inventory() {
  let item = useSelector((state) => {
    return state.item;
  });
  let dispatch = useDispatch();

  return item.map((items, i) => {
    return (
      <tr key={items.id}>
        <td>{items.id}</td>
        <td>{items.name}</td>
        <td>{items.count}</td>
        <td>
          <button
            onClick={() => {
              //changeName();
              //그냥 무지성으로 changeName()으로 불러오면 안되고
              //일단 import한 후에 useDispatch 라는 함수를 써야함
              //이게 뭐냐? store.jsx에 요청을 보내주는 함수임
              //그 후에는
              //dispatch(changeName());
              //추가하기 버튼을 누르면 {items.id} 요 id값을 가진 친구의 count값을 + 1 해주세요 하면됨
              dispatch(increaseCount(items.id));
            }}
          >
            +
          </button>
        </td>
      </tr>
    );
  });
}

export default Cart;

//오늘의 숙제
//detailpage에서 주문하기를 누르면 장바구니에 동일한 아이템을 추가해주기
//{ id: 2, name: 'Grey Yordan', count: 1 },
//이런거 하나 더 추가된다고 보면 될듯
