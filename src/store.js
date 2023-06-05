import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'

// useState 역할느낌
// name : 'state 이름',
// initialState : '값'

// let user = createSlice({ 
//   name : 'user',
//   initialState : { name : 'kim', age : 20},
//   reducers :{
//     changeName(state){ // (state) : 기존 state
//       // 1. 함수 만들기
//       // return 'john ' + state
//       state.name = 'park'
//     },

//     ageAdd(state, action){
//       state.age += action.payload
//     }
//   }
// })



// 2. export 하기
// export let { changeName, ageAdd } = user.actions; // export 하고 싶은 함수명 {, ..}



let stock = createSlice({ 
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : "cart",
  initialState : 
  [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    countAdd(state, action){
      // return (state[0].count + 1);
      let {id} = action.payload;
      let item = state.find( item => item.id === id);

      if(item) {
        item.count++;
      }
    },

    addItem(state, action) {
      let getItem = action.payload;
      let item = {
        id : getItem.id,
        name : getItem.title,
        count : 1
      }
      
      state.push(item);
    },
  }
})

export let { countAdd, addItem } = cart.actions;


export default configureStore({
  reducer: {
    // 작명 : state 이름.reducer
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
  }
})