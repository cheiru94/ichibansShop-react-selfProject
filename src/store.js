// 리덕스를 사용하면 state를 보관하는 통(store)을 만들어 주는 것이다.

import { configureStore, createSlice } from '@reduxjs/toolkit';

import user from './store/userSlice.js'



let cart = createSlice({ //useState 역할과 비슷
  name: 'cart',
  initialState: [
    // { id: 0, name: 'White and Black', count: 2 },
    // { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    addCount(state, action) {
      let 번호 = state.findIndex((a) => { return a.id === action.payload })
      state[번호].count++
    },
    removeCount(state, action) {
      let 번호 = state.findIndex((a) => { return a.id === action.payload })
      if (state[번호].count > 0) {
        state[번호].count--

      }
    },

    addItem(state, action) {
      // if (condition) {

      // }
      state.push(action.payload)
    }

  }
})
export let { addCount, addItem, removeCount } = cart.actions

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer
  }
})