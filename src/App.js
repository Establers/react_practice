import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import bg_img from './img/bg.png';
import { lazy, Suspense, useEffect, useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

// import DetailProducts from './routes/Detail';
// import Cart from './routes/Cart.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const DetailProducts = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));



function App() {
  
  /*
  let obj = { name : 'kim'};
  localStorage.setItem('data', JSON.stringify(obj));
  let 꺼낸 = localStorage.getItem('data')
  console.log(JSON.parse(꺼낸))
  console.log(꺼낸)
  */

  useEffect(()=>{
    let w = JSON.parse(localStorage.getItem('watched'));
    if(!w){
      localStorage.setItem('watched',JSON.stringify([]))
    }
  },[])

  let [shoes, setShoes] = useState(data)
  useEffect( () => {
    console.log("shoes 가 변경 됐어요");
  }, [shoes])
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수

  let result = useQuery(['getUsername'], ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log("요청됨")
      return a.data;
    })
  })

  console.log(result.data)

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">The Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => {navigate('/')}} >홈</Nav.Link>
            <Nav.Link onClick={ () => {navigate('/detail')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={ () => {navigate('/cart')}}>장바구니</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading ? '로딩중' : result.data.name }
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지 </Link>
      <Suspense fallback={<div>로딩...</div>}>
      <Routes>
        
        <Route path="/" element={
          <>
          <div className='main-bg' style={{ backgroundImage : 'url('+ bg_img +')'}}></div>
          <Container>
            <Row>
              {shoes.map(function (shoe, i) {
                return (
                  <Products i={i} shoe={shoe}></Products>
                );
              })}
            </Row>
          </Container>
          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              console.log(result.data);
              // shoes 에 추가
              let copy = [...shoes];
              // result.data.map((shoe) => { copy.push(shoe); })
              copy = [...shoes, ...result.data];
              setShoes(copy);
            })
            .catch(()=>{
              console.log("Axios 실패")
            })

            Promise.all([ axios.get('url1'), axios.get('url2')])
            .then( ()=> {
              // 2개가 완료되어야 실행
            })

          }}>더보기 버튼</button>
          </>
        }/> 
        <Route path="/detail/:id" element={ 
          <Suspense fallback={<div>로딩중임~</div>}>
            <DetailProducts shoes={shoes} />
          </Suspense>
        }/>
            
        <Route path="/cart" element={ <Cart/> }></Route>
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임~</div>}></Route>
          <Route path="location" element={<div>위치정보임!</div>}></Route>
        </Route>
        
        <Route path="/event" element={<TodayEvent></TodayEvent>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}></Route>

        </Route>

        <Route path="*" element={<div>없는 페이지입니다.</div>}/>
       
      </Routes>
      </Suspense>
      {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%"/> */}
            {/* public 폴더에 있는 이미지 쓰는 방식 */}
      
    </div>
  );
}

function Products(props) {
  let navigate = useNavigate();
  let idx = props.i;
  console.log(props.shoe)
  return (
    <Col md={4}>
    <img src= {`https://codingapple1.github.io/shop/shoes${idx+1}.jpg`} width="80%"
    onClick={()=>{ navigate(`/detail/${idx}`)}}/>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  )
}

function About (){
  return (
    <div>
      <Outlet></Outlet>
      <h4>회사정보임</h4>
    </div>
  )
}

function TodayEvent(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
