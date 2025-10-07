import { Container, Row, Col } from 'react-bootstrap';

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
    </div>
  );
}

function CellItem(props) {
  return (
    <Row>
      {props.shoes.map((shoe, i) => {
        return (
          <Col key={shoe.id}>
            <img src={shoe.img} alt={`신발${i + 1}`} width={'80%'} />
            <h4>{shoe.title}</h4>
            <p>{shoe.price}</p>
          </Col>
        );
      })}
    </Row>
  );
}

export { MainPage };
