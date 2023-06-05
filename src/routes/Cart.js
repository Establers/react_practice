import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {countAdd } from "./../store.js";
import { changeName, ageAdd } from "./../store/userSlice.js";
import { memo, useMemo, useState } from "react";

// function Child(){
//   console.log("child 재 렌더링")
//   return <div>자식임</div>
// }

let Child = memo( function(){
  console.log("child 재 렌더링")
  return <div>자식임</div>
})
// memo는 전달받는 props 가 변할 때만 재 렌더링 해줌

function 복잡하고오래걸리는함수(){
  return 반복문10억번돌린결과
}

function Cart() {

  let result = useMemo(()=>{ return 복잡하고오래걸리는함수() }, [])
  // 컴포넌트 렌더링시 1회만 실행해주는 것
  // ,[] 하면 해당 스테이트 변할 때 실행 시켜줌

  // let state = useSelector((state) => { return state })
  // console.log(state.stock)
  // (state)는 모든 state를 의미함. return state.user로 일부를 가져올 수 있음 
  let cart = useSelector((state) => { return state.cart })
  console.log(cart)
  
  let state = useSelector((state) => { return state })
  // 3. dispatch 사용하기 store.js에 요청을 보내주는 함수
  let dispatch = useDispatch()

  let [count, setCount] = useState(0)

  return (
    <div>
      <Child count={count}></Child>
      <button onClick={()=>{ setCount(count+1)}}>재렌더링 테스트</button>
      {state.user.name} {state.user.age}의 장바구니
      <button onClick={()=>{ dispatch(ageAdd(11)) }}>버튼</button>

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
            {
            cart.map((items) => {
              return (
                <tr key={items.id}>
                  <td>{items.id}</td>
                  <td>{items.name}</td>
                  <td>{items.count}</td>
                  <td>
                    <button onClick={()=>{
                      dispatch(countAdd({ id : items.id}))
                    }}>+</button>
                  </td>
                </tr>
              );  
            })
            }
        </tbody>
      </Table>
    </div>
  );
}


export default Cart
