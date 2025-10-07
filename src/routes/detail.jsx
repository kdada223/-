import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage(props) {
  useEffect(() => {
    // 안에 사용하는 것들
    // 어려운 연산
    // 서버에서 데이터가져오는 작업
    // 타이머 장착하는거

    setTimeout(() => {
      displayState(false);
    }, 2000);
  });

  let [display, displayState] = useState(true);

  let [count, countState] = useState(0);

  let { id } = useParams();
  let findItem = props.shoes.find((x) => {
    return x.id == id;
  });

  // id가 없거나 findItem이 없을 때 기본값 설정
  if (!findItem) {
    findItem = props.shoes.find((x) => x.id === 0); // id가 0인 상품을 찾기
  }

  return (
    <div className="container">
      {display == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : (
        ''
      )}
      <button
        onClick={() => {
          countState(count + 1);
          console.log(count);
        }}
      >
        업데이트
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={findItem.img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
