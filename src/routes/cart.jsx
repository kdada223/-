import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
  let state = useSelector((state) => {
    return state.item;
  });
  console.log(state.item);
  //useSelector에서 익명함수 안의 state는 store안에 있는 모든 state를 뜻한다.
  //그리고 나서 return state는 모든 state를 내보낸다는 뜻이지만 여기서 state.user 한 후 변수에 저장하면 그 변수에는 user에 대한 값만
  //들어있다.
  //그리고 redux를 쓸 때 주의할 점이 모든 state들을 store에 집어넣을 필요가 없음. 만약에 특정 컴포넌트 안에서만 쓰는 state면 그냥 거기서 만들면 됨

  return (
    <div>
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
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
