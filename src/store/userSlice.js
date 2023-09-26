import { createSlice } from '@reduxjs/toolkit';


// state하나를 slice라고 부른다.
let user = createSlice({ //useState 역할과 비슷
  name: 'user',
  initialState: { name: 'lee', age: 20 },
  reducers: {
    changeName(state) {
      state.name = 'park'
    },
    ageUp(state, action) { // state변경 함수들을 전부 action이라고 한다. 
      state.age += action.payload
    }
  }
})
export let { changeName, ageUp } = user.actions // 외부에서도 사용할 수 있게 꼭 export를 해야한다. 

export default user