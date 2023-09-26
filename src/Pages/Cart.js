import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, ageUp } from "./../store/userSlice.js"
import { addCount, removeCount } from "./../store.js"

function Cart() {

  // 이 자리에는 strore.js 에 있던 모든 state가 이 자리에 남는다. 
  // 그래서 이걸 변수에 저장해서 가져와 사용하면 된다.
  let state = useSelector((state) => state) //store에 있던 state들을 객체로 가져와주는 함수
  let dispatch = useDispatch() // store.js한테 요청을 보내주는 함수 

  return (
    <div>
      <Table>
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
            state.cart.map((e, i) =>
              < tr key={i} >
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.count}</td>
                <td>
                  <button onClick={() => { dispatch(addCount(state.cart[i].id)) }}>➕</button>
                  <button onClick={() => { dispatch(removeCount(state.cart[i].id)) }}>➖</button>
                </td>
              </tr>
            )
          }

        </tbody>
      </Table>
    </div >
  )
}
export default Cart