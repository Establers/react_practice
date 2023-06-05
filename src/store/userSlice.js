import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      // (state) : 기존 state
      // 1. 함수 만들기
      // return 'john ' + state
      state.name = "park";
    },

    ageAdd(state, action) {
      state.age += action.payload;
    },
  },
});
export let { changeName, ageAdd } = user.actions; // export 하고 싶은 함수명 {, ..}

export default user