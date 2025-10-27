import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import data from './data.jsx';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailPage from './routes/detail.jsx';
import { MainPage } from './routes/main.jsx';
import Cart from './routes/cart.jsx';

export let Context1 = createContext();
//Context API 사용 1번 createContext 이거 만들기 이게 뭐냐? state 보관함이다..

function App() {
	// let obj = { name: 'kim' };
	// localStorage.setItem('data', JSON.stringify(obj));
	// //localstorage에 데이터를 저장할 때는 JSON 파일로 저장해야하는데 그거를 자동으로 바꿔주는 작업을 해주는 친구가
	// //JSON.stringify() 이친구임 내가 obj자료형으로 저장해놓은 애를 저 괄호안에 집어넣으면 변경해줌
	// let 꺼낸거 = localStorage.getItem('data');
	// console.log(꺼낸거);
	// //이 상태에서 그냥 꺼내면 JSON 형태로 변환했기에 문자열로 다 반환이 되는데 이거를 변환해서 꺼내면 됨 어떻게?
	// console.log(JSON.parse(꺼낸거).name);
	// //요롷게

	useEffect(() => {
		let localArr = localStorage.setItem('watched');
		if (localArr === null) {
			localStorage.setItem('watched', JSON.stringify([]));
		}
	}, []);

	let [shoes, shoesState] = useState(data);
	let [item] = useState([10, 11, 12]);
	let navigate = useNavigate();
	let [count, setCount] = useState(2);
	let [isLoading, loadingState] = useState(false);

	return (
		<div className='App'>
			<Navbar bg='dark' data-bs-theme='dark' className='Nav-Main'>
				<Container className='Nav-Box'>
					<Navbar.Brand href='#home'>Steam</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link
							onClick={() => {
								navigate('/');
							}}>
							Home
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								navigate('/detail');
							}}>
							Detail
						</Nav.Link>
						<Nav.Link
							onClick={() => {
								navigate('/cart');
							}}>
							Cart
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path='/' element={<MainPage shoes={shoes} shoesState={shoesState} count={count} setCount={setCount} isLoading={isLoading} loadingState={loadingState}></MainPage>} />

				<Route
					path='/detail'
					element={
						<Context1.Provider value={{ item }}>
							<DetailPage shoes={shoes}></DetailPage>
						</Context1.Provider>
						//2.Context로 원하는 컴포넌트 감싸기
						//3.value = {{state1, state2, state3...}} 밸류를 열어서 쓸 스테이트를 집어넣는다.
						//이렇게 만든건 정한 컴포넌트의 자식요소들까지도 다 쓸 수 있삼
					}
				/>

				<Route path='/detail/:id' element={<DetailPage shoes={shoes}></DetailPage>} />

				<Route path='/cart' element={<Cart></Cart>} />

				<Route path='/about' element={<About></About>}>
					<Route path='member' element={<div>멤버임</div>} />
					<Route path='location' element={<div>위치정보임</div>} />
				</Route>

				<Route path='/event' element={<Event></Event>}>
					<Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
					<Route path='two' element={<div>생일기념 쿠폰받기</div>} />
				</Route>

				<Route path='*' element={<div>없는페이지</div>} />
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

//서버 : 데이터를 요청하면 데이터를 보내주는 걸 서버라고 함.
//서버 개발시 짜는 코드 : 누가 A요청하면 A보내주세요
//그냥 달라는게 아니라 정확히 규격에 맞춰 요청해야함.
//규격은 방법과 자료가 있는데 방법은 GET/POST이고 어떤자료는 URL형식으로 기입을 해주면 됨.
//네이버 웹툰이 보고 싶다. 그러면 GET요청을 하고 comic.naver.com 으로 요청을 하면됨.
//네이버 블로그서버에 네이버 글을 하나 발행하고 싶다? 그러면 POST요청을 하면됨 어디로? blog.naver.com 으로
//그러면 서버에 내 블로그가 저장됨.
//URL은 서버 만든 사람한테 물어보면 알려줌
//서버 요청 방식을 자세히 설명하면 누가 comic.naver.com 으로 GET요청하면 웹툰 보내주쇼
//ajax라는 걸 사용하면 새로고침 없이도 GET/POST 요청 가능
//ajax 쓰려면 3가지 정도 방법이 있는데
//1. XMLHttpRequest(옛날 자바스크립트 문법) 2. fetch(요즘 자바스크립트 문법) 3. axios 같은거 (외부라이브러리) 5분31초

//서버로 데이터 전송 axios.post('url입력', {넣고싶은 데이터 ex) name: 'kim'})
//get요청을 여러 곳으로 요청하고 싶을 때는
//Promise.all([axios.get('url입력')], [axios.get('url입력')]) 그 후에 두개가 다 성공했을 때 데이터를 받고 싶어요 하면
//Promise.all([axios.get('url입력')], [axios.get('url입력')]).then(()=>{}) 이렇게 작성
//나눠서 작성해도 되는데 그건 둘 중 하나라도 되면 성공한게 나옴
//원래 서버와 데이터를 주고 받을 때는 문자만 주고 받을 수 있음. array나 object자료는 못받음
//그런데 어떻게 우리는 array 자료를 받았냐?
//array나 object자료를 주고 받을 때 '{'name' : 'kim'}' 이렇게 따옴표를 쳐놓으면 array나 object 자료도 주고 받기 가능하다.
//이런 자료들을 JSON 이라고 한다.
//axios가 문자열로 도착한 JSON 파일은 array로 자동으로 바꿔줌

//응용3. 버튼을 누른 직후엔 "로딩중입니다" 이런 글자를 주변에 띄우고 싶으면?

// 그리고 요청이 성공하거나 실패하거나 그 후엔 "로딩중입니다" 글자를 제거해야합니다.

//동적UI만드는법 3스텝
//html, css 디자인
//UI의 현재 상태를 state로 저장
//state에 따라서 UI가 어떻게 보일지 작성

//singlepage App 단점
//컴포넌트간의 state 공유 어려움
