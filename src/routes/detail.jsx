import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { addItem } from '../store.jsx';
import { useDispatch } from 'react-redux';

// import { Context1 } from '../App';
//4. 그렇게 세팅해놓은걸 가져다 쓰려면 일단 import해야함

function DetailPage(props) {
	let [display, displayState] = useState(true);
	let [numAlert, AlertState] = useState('');

	let [count, countState] = useState(0);
	let [tab, tabState] = useState(0);

	//5. 그 후에 이제 진짜로 가져다쓰려면 useContext 입력하고 내가 보관한걸 넣으면 됨.
	//useContext 이 함수는 보관한 걸 해체해주는 함수임
	// let { item } = useContext(Context1);

	useEffect(() => {
		// 안에 사용하는 것들
		// 어려운 연산
		// 서버에서 데이터가져오는 작업
		// 타이머 장착하는거
		//useEffect에서 생명주기
		//Mount (마운트): 컴포넌트가 처음 생성되어 DOM에 삽입될 때
		// useEffect 실행

		// Update (업데이트): 컴포넌트가 재렌더링될 때 (state나 props 변경)
		// 이전 useEffect cleanup 실행 → 새 useEffect 실행

		// Unmount (언마운트): 컴포넌트가 DOM에서 제거될 때
		// cleanup 함수 실행

		//결론 언마운트만 실행하고 싶다 useEffect안의 return에 함수 작성
		//마운트시 1회 코드 실행 [] 대괄호 작성
		//재렌더링마다 코드실행 그냥 useEffect안에 작성

		let a = setTimeout(() => {
			displayState(false);
		}, 2000);
		console.log(2);
		return () => {
			// 기존 타이머는 제거해주세요
			// clearTimeout(a); //타이머 제거 함수 타이머를 만들고 변수에 저장한 다음 그 변수를 clearTimeout 이라는 함수에 집어넣으면 제거가 됨
			//서버에서 데이터를 요청하는 코드를 썼는데 그게 2초 정도 걸린다고 가정해보자
			//그런데 2초사이에 재렌더링이 되어버리면? 계속해서 무한 요청을 보내게 되는데 그거를 막는 방법은?
			//기존 데이터 요청은 제거해주세요 이럴 때도 clear함수 사용하면 됨.
			console.log(1);
			clearTimeout(a);
		};
	}, []);
	useEffect(() => {
		//인풋에서 값을 받아와서 인풋창의 내용이 int값 즉 정수형이 아니면 AlertState를 true로 변경
		//여기서 중요한 점!onchage라는 함수가 있는데 이게 바로 js의 자바스크립트의 input내용과 비슷하다.
		//작성할 때 실시간으로 값을 업데이트 해서 확인해줌
		//isNaN이라는 함수를 쓰는데 저놈은 숫자가 아닌 값을 찾아냄
		//그러니까 isNaN안의 ()에 들어간 값이 숫자다! 그러면 false를 반환하지만 숫자가 아니면 true를 반환한다.
		//결론! isNaN(true)면 어떻게 할래? alert창을 띄우고 문제있음을 실행한다.
		//그런데 문제가 생길 때마다 해야하니까 디펜던시스에 input에 들어갈 내용을 체크해야ㅕ하기 떄문에 numAlert이 값을 넣어준다.
		//또 업데이트 마다 실행해야하기때문에 [] 안에 값을 numAlert 이걸로 넣어서 확인하면될듯함. 위의 주석과 같은 내용
		if (isNaN(numAlert) === true) {
			alert('똑바로 입력하삼');
		}
	}, [numAlert]);

	let { id } = useParams();
	let findItem = props.shoes.find((x) => {
		return x.id == id;
	});

	let disPatch = useDispatch();
	// id가 없거나 findItem이 없을 때 기본값 설정
	if (!findItem) {
		findItem = props.shoes.find((x) => x.id === 0); // id가 0인 상품을 찾기
	}

	let [fade, fadeState] = useState('');
	useEffect(() => {
		setTimeout(() => {
			fadeState('end');
		}, 50);
		return () => {
			fadeState('');
		};
	}, []);
	useEffect(() => {
		let originItem = localStorage.getItem('watched');
		originItem = JSON.parse(originItem);
		originItem.push(findItem.id);
		originItem = new Set(originItem);
		originItem = Array.from(originItem);
		localStorage.setItem('watched', JSON.stringify(originItem));
	}, []);

	return (
		<div className={`container start ${fade}`}>
			{display == true ? <div className='alert alert-warning'>2초 이내 구매시 할인</div> : null}

			<div className='row'>
				<div className='col-md-6'>
					<img src={findItem.img} width='100%' />
				</div>
				<div className='col-md-6'>
					<input
						type='text'
						placeholder='수량을 입력하세요'
						onChange={(e) => {
							{
								AlertState(e.target.value);
							}
						}}
					/>
					<h4 className='pt-5'>{findItem.title}</h4>
					<p>{findItem.content}</p>
					<p>{findItem.price}</p>
					<button
						className='btn btn-danger'
						onClick={() => {
							disPatch(addItem({ id: findItem.id, name: findItem.title, count: 1 }));
						}}>
						주문하기
					</button>
				</div>
			</div>
			<Nav variant='tabs' defaultActiveKey='link-0'>
				<Nav.Item>
					<Nav.Link
						eventKey='link-0'
						onClick={() => {
							tabState(0);
						}}>
						버튼0
					</Nav.Link>
					{/* 이거 눌렀을 때 state 변경해서 이거랑 연결된 창 띄워주세요~ */}
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey='link-1'
						onClick={() => {
							tabState(1);
						}}>
						버튼1
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey='link-2'
						onClick={() => {
							tabState(2);
						}}>
						버튼2
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab} />
		</div>
	);
}

//클린업함수에 넣으면 되야하는데 왜 안되나?
//리액트의 automatic batching이라는 기능때문인데
//state변경한 함수들이 근처에 있으면 하나로 합쳐서 한번만 state를 변경해줌.
//state가 변경될 때마다 재렌더링이 되는게 아니라 마지막에 짠 state변경함수만 재렌더링을 해줌
function TabContent({ tab }) {
	let [fade, fadeState] = useState('');
	// let { item } = useContext(Context1);
	//요 코드 한줄이면 props 없이도 가져다가 쓸 수 있삼
	//그런데 단점은? state변경 시 쓸데없는 것까지 재렌더링 시킴
	//나는 item이라는걸 detail에 넣어놓고 탭콘텐츠에서만 써도 item을 안쓰는 컴포넌트들도 다 재렌더링시켜버림
	//또 다른 단점은 나중에 컴포넌트 재사용이 어려운데 자식 컴포넌트가 컨텍스트 문법을 가져다쓰면 다른 페이지에서 가져다 쓰고 싶으면 어려울 수 있음
	//

	useEffect(() => {
		setTimeout(() => {
			fadeState('end');
		}, 100);
		return () => {
			fadeState('');
		};
	}, [tab]);
	return <div className={`start ${fade}`}>{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}</div>;
}

// function TabContent(props) {
// 	if (props.tab == 0) {
// 		return <div>내용0</div>;
// 	} else if (props.tab == 1) {
// 		return <div>내용1</div>;
// 	} else if (props.tab == 2) {
// 		return <div>내용2</div>;
// 	}
// }
// 만약에 props를 쓰기 귀찮다 ? 다른 방법이 있는데 props 자리에 그냥 변수이름을 { }안에 넣으면 됨 위의 예시는 { tab } 이렇게 쓰면 개꿀이다
//여러개가 있다? {tab, tab2, tab3} 이렇게 쓰면 됨
//그리고 if문 대신에
// [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]; 이렇게 사용하면 tab이 0번째면 내용0 1번째면 내용1을 꺼낼테니 if문이 필요없을 수도?

//지금보면 app.jsx에 있던 shoes 라는 state를 2번 밑에 있는 tapContent 에 넣기 위해서는 두번이나 props를 해야한다.
//지금은 두번이지만 만약에 9번 10번 중첩되면 그 만큼 props를 해서 가져와야함.. 귀찮음..
//그래서 있는 방법 두가지
//1. Content API(리액트 기본문법)
//2. Redux 등 외부라이브러리 설치
//오늘은 첫번째 방법 쓸거임 그런데 실전에서는 1번 잘안씀 이유는? 성능이슈,컴포넌트 재활용이 좀 어렵다

export default DetailPage;
