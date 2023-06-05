import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import { addItem } from "../store";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`
// styled components는 프로그래밍 적인 것도 가능하다.

// let NewBtn = styled.button(YellowBtn)`
//   ... 새로운 것을 복사해서 쓸 수 있다.
// `
// JS 파일 매우복잡해지는 단점
// style 재사용은 export, import 하면 CSS랑 다를게 없다. ㅋㅋ
// 팀으로 할 때 CSS 담당의 숙련도 이슈. 잘 모를 수 있다.

let Box = styled.div`
  background : grey;
  padding : 20px;
`

function DetailProducts(props){

  let dispatch = useDispatch();
  // 컴포넌트의 Life cycle
    // 타이머
  // setTimeout( () => { 실행할 코드 }, 1000);
  let [sale, setSale] = useState(true);

  let [count, setCount] = useState(0);
  let {id} = useParams(); // url의 id값

  let idx = props.shoes.find( (a) => {
    return a.id == id;
  })

  let [num, setNum] = useState('');
  useEffect( () => {
    if(isNaN(num) == true){
      alert("그러지마세용..");
    }
  }, [num])
  
  let [tabs, setTabs] = useState(0);

  let [fadeMain, setFadeMain] = useState('');
  useEffect(()=>{
    setFadeMain('end')
    console.log("setFadeMain : end")
    return(()=>{
      setFadeMain('');
    })
  },[])

  useEffect( () => {
    // Mount, update 시 여기 코드 실행됨
    let a  = setTimeout( () => {setSale(false);}, 2000)
    console.log("useEffect");
    
    return () => {
      console.log("clean up function! ")
      clearTimeout(a);  // 기존 타이머는 제거해주세요~~ 
      // 타이머를 안전하게..사용할 수 있음
      // 기존 데이터 요청은 제거해주세요! : 다시 데이터 요청을 깔끔하게 받을 수 있다. 충돌방지
      // mount 시에는 실행되지 않고, unmount 시에도 실행됨!
    }
  })
  
  // 최근 본 상품관련
  useEffect(()=>{
    // 최근 본 상품
    let watchedProducts = new Set(JSON.parse(localStorage.getItem('watched')));
    watchedProducts.add(idx.id);
    console.log("watchedProducts", watchedProducts);
    localStorage.setItem('watched', JSON.stringify(Array.from(watchedProducts)));
  }, [])

  // useEffect 쓰는 이유 : 렌더링이 다 되고나서 실행된다.
  // 어려운 연산, 서버에서 데이터 가져오는 작업, 타이머 장착하는 것 등
  // 왜 Effect 라는 이름? : side Effect : 함수의 핵심기능과 상관없는 부가기능에서 따온 이름

  // ,[] 를 넣는 거는 뭐냐
  // useEffect 실행 조건을 넣을 수 있는 곳은 [] : dependancy 추가.
  // 즉 [count] 이면 count 라는 변수가 변할 때만 코드가 실행이 됨, 
  // mount 시 count 라는 변수가 바뀌면 실행됨
  // [] 이면 : mount 시에만 실행됨 

  // useEffect 에 return 을 추가하면 useEffect 동작 `전`에 실행됨

  /* 
    useEffect(()=>{ 실행할코드 }) 이러면 재렌더링마다 코드를 실행가능합니다.
    useEffect(()=>{ 실행할코드 }, [])  이러면 컴포넌트 mount시 (로드시) 1회만 실행가능합니다.

    useEffect(()=>{ 
      return ()=>{
      실행할코드
      }}) 이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다. 
    
    useEffect(()=>{ 
      return ()=>{
        실행할코드
      }
    }, []) 이러면 컴포넌트 unmount시 1회 실행됩니다.
    
    useEffect(()=>{ 
      실행할코드
    }, [state1])
    이러면 state1이 변경될 때만 실행됩니다. 
  */

  // for(var i =0; i< 10000; i++){
  //   console.log(1);
  // } // 이 오래걸리는 코드를 useEffect에 넣어서 빨리빨리 되게 할 수 있따.



  return (
    <div className={`container start ${fadeMain}`}>
      { 
        sale == true ? 
        <div className="alert alert-warning">     
          2초 이내 구매시 할인!
        </div> : null
      }
      {count}
      <YellowBtn bg="blue" onClick={ () => { setCount(count + 1);}}> 버튼 </YellowBtn>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (idx.id+1) + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <input onChange={ (i)=> { setNum(i.target.value)}}></input>

          <h4 className="pt-5">{idx.title}</h4>
          <p>{idx.content}</p>
          <p>{idx.price}</p>
          
          <button className="btn btn-danger" onClick={()=>{
            console.log(idx)
            dispatch(addItem(idx))
          }}>주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTabs(0) }} eventKey="link-0">버튼 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{ setTabs(1) }} eventKey="link-1">버튼 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{ setTabs(2) }} eventKey="link-2">버튼 3</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabCoponent tabs={tabs}/>
      

    </div> 
  );
}

function TabCoponent({tabs}){
  // if( tabs == 0){
  //   return <div>내용0</div>
  // } 
  // if( tabs == 1){
  //   return <div>내용1</div>
  // }
  // if( tabs == 2){
  //   return <div>내용2</div>
  // }
  
  let [fade, setFade] = useState('');

  // tabs 가 변할 때 마다 end 가 부착 되야 fade in 처럼 됨 (start end 처럼)
  useEffect(()=>{
    let b = setTimeout(()=>{ setFade('end')}, 10)
    // setFade("end"); // automatic batching 때문에 안댐
    // state 변경할 때마다 재렌더링해주는게 아니라, 마지막 다 끝날때 해주는거라

    return ()=>{
      clearTimeout(b);
      setFade('');
    }
  }, [tabs])

  return <div className={`start ${fade}`}>
    { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabs]}
  </div>
}
// props 가 귀찮으면 프록스 이름을 {tabs}



export default DetailProducts;