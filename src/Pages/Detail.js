import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addItem } from './../store.js';

let Betty = styled.div`
  background:${props => props.bg};
  color:white;
  padding:20px
`
let Betty2 = styled(Betty)`
padding : 50px;
`

let Box = styled.div`
background:${p => p.bg};
color: white;
border-radius:50%;
`

function Detail({ shoes }) {


  let { id } = useParams();
  let 찾은상품 = shoes.find(x => { return x.id == id; });
  let [alert, setAlert] = useState(true);
  let [inputData, setInputData] = useState('');
  let [isNum, setIsNum] = useState(false);
  let [tab, setTab] = useState(2);
  let dispatch = useDispatch();
  let [buy, setBuy] = useState(0);
  let [fade2, setFade2] = useState('');


  useEffect(() => {

    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = [...꺼낸거] // 이거랑 같은 의미다 Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))

  }, [])






  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 2000);


    if (!!isNaN(inputData)) {
      setIsNum(true)
    } else {
      setIsNum(false)
    }

    // 트랜지션 효과주기 
    let a = setTimeout(() => {
      setFade2('end')
    }, 100);

    return () => {
      clearTimeout(a)
      setFade2('')
    }
  }, [])

  return (
    <div className={'container start ' + fade2}>
      {alert === true ? <div className="alert alert-warning">
        2秒 以内購買の場合割引！！！！
      </div> : null}

      {/* 🟢🟢🟢🟢🟢🟢🟢🟢🟢 */}
      数量：<input onChange={(e) => {
        setInputData(e.target.value);
        setBuy(e.target.value)
        console.log(inputData)
      }}></input>

      {
        isNum === true ? <div
          style={{ backgroundColor: "red", color: "white" }}
        >警告：数字のみご記入しなさい。</div> : null
      }

      {/* <Betty bg="red">이것이 바로 styled-components</Betty>
      <Betty bg="blue">이것이 바로 styled-components</Betty>
      <Betty2 bg="green">cascascpkaopsasockapskcopa</Betty2> */}
      <div className="row">
        <div className="col-md-6">
          <img src={찾은상품.img} width="100%" alt='noPicture' />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              // if (찾은상품.title) {

              // }
              dispatch(addItem({ id: 찾은상품.id, name: 찾은상품.title, count: buy }))
            }}
          >
            注文
          </button>
        </div>
      </div>
      <Box bg='black'>お洒落な貴方に</Box>

      {/* 네브바  */}
      <Nav variant="tabs" defaultActiveKey="0">
        <Nav.Item>
          <Nav.Link eventKey="0" onClick={(e) => { setTab(0) }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={(e) => { setTab(1) }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" onClick={(e) => { setTab(2) }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={shoes} />
    </div>
  )
}
function TabContent({ tab, shoes }) {
  let [fade, setFade] = useState('')
  useEffect(() => {
    let a = setTimeout(() => {
      // console.log(shoes)
      setFade('end') // automatic batch 때문에 state변경 함수를 연달아 쓰면 마지막 값으로 처리함
    }, 100)
    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])
  return <div className={'start ' + fade}>
    {[<div>内容⓪</div>, <div>内容❶</div>, <div>内容❷</div>][tab]}
  </div>


}


export default Detail;