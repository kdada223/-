import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data.jsx';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './routes/detail.jsx';
import { MainPage } from './routes/main.jsx';

function App() {
  let [shoes, shoesState] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" className="Nav-Main">
        <Container className="Nav-Box">
          <Navbar.Brand href="#home">Steam</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={<MainPage shoes={shoes} shoesState={shoesState}></MainPage>}
        />

        <Route
          path="/detail"
          element={<DetailPage shoes={shoes}></DetailPage>}
        />

        <Route
          path="/detail/:id"
          element={<DetailPage shoes={shoes}></DetailPage>}
        />

        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <div>어바웃페이지임</div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
