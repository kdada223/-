import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function MainPage(props) {
  return (
    <div>
      <div className="main-bg"></div>
      <div>
        <button
          onClick={() => {
            let copy = [...props.shoes];
            copy.sort((a, b) => {
              return a.title.localeCompare(b.title);
            });
            props.shoesState(copy);
          }}
        >
          이름 정렬
        </button>
      </div>
      <Container>
        <CellItem shoes={props.shoes}></CellItem>
      </Container>
      {props.count < 4 ? (
        <button
          onClick={() => {
            props.loadingState(true);
            axios
              .get(
                `https://codingapple1.github.io/shop/data${props.count}.json`
              )
              .then((data1) => {
                let copy = [...props.shoes, ...data1.data];
                props.shoesState(copy);
                props.setCount(props.count + 1);
                props.loadingState(false);
              })
              .catch(() => {
                console.log('실패함 ㅅㄱ');
                props.loadingState(false);
              });
          }}
        >
          더보기
        </button>
      ) : (
        <div>더 이상 상품이 없습니다.</div>
      )}
      {props.isLoading == true ? <div>로딩중~</div> : null}
    </div>
  );
}

function CellItem(props) {
  return (
    <Row>
      {props.shoes.map((shoe, i) => {
        return (
          <Col md={4} key={shoe.id}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}
              alt={`신발${i + 1}`}
              width={'80%'}
            />
            <h4>{shoe.title}</h4>
            <p>{shoe.price}</p>
          </Col>
        );
      })}
    </Row>
  );
}

export { MainPage };
