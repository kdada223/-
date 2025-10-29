import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MainPage(props) {
	let [watched, setWatched] = useState([]);

	useEffect(() => {
		let local = localStorage.getItem('watched');
		if (local) {
			setWatched(JSON.parse(local));
		}
	}, []);
	return (
		<div>
			<div className='main-bg'>
				<div className='seeBox'>
					최근 본 상품
					{watched.map((id) => {
						let product = props.shoes.find((shoe) => shoe.id === id);
						return <div key={id}>{product ? product.title : `상품 ${id}`}</div>;
					})}
				</div>
			</div>
			<div>
				<button
					onClick={() => {
						let copy = [...props.shoes];
						copy.sort((a, b) => {
							return a.title.localeCompare(b.title);
						});
						props.shoesState(copy);
					}}>
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
							.get(`https://codingapple1.github.io/shop/data${props.count}.json`)
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
					}}>
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
						<Link to={`/detail/${shoe.id}`} className='noBlue'>
							<img src={`https://codingapple1.github.io/shop/shoes${shoe.id + 1}.jpg`} alt={`신발${i + 1}`} width={'80%'} />
							<h4>{shoe.title}</h4>
							<p>{shoe.price}</p>
						</Link>
					</Col>
				);
			})}
		</Row>
	);
}

export { MainPage };
