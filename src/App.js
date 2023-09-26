import { createContext, useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom';
import Detail from './Pages/Detail.js'
import axios from 'axios'
import Cart from './Pages/Cart'
import { useQuery } from '@tanstack/react-query';

export let Context1 = createContext();

function App() {


  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();// 페이지 이동을 도와주는 함수 
  let [alert, setAlert] = useState(false)
  let [count, setCount] = useState(1)

  useEffect(() => {
    let watched = localStorage.getItem('watched')
    watched = JSON.parse(watched)
    console.log(watched)
    // if (watched.length === 0) {
    //   localStorage.setItem('watched', JSON.stringify([]))
    // }
  }, [])


  let result = useQuery(['작명'], () =>
    axios.get('https://codingapple1.github.io/userdata.json')
      .then(a => {
        console.log('니 다른데 갔다 왔구나??  ㅇㅋ 재요청됨')
        return a.data
      })
  )



  return (
    <div className="App">

      <Navbar className='navbar' style={{ fontSize: "30px" }} data-bs-theme="light">
        <Container className='container'>
          <Navbar.Brand href="#home" style={{ fontSize: "50px", margin: "auto" }} onClick={() => { navigate('/') }}>ICHIBAN'S</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar>
        <Nav className="me-auto" style={{ fontSize: "30px", marginLeft: "auto" }}>
          <Nav.Link onClick={() => { navigate('/') }}>ホーム</Nav.Link>
          <Nav.Link onClick={() => { navigate('/detail') }}>ディティール</Nav.Link>
          <Nav.Link onClick={() => { navigate('/cart') }}>カート</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          {result.isLoading ? 'ロード中' : result.data.name}
        </Nav>
      </Navbar>




      {/* 🟢 라우터 🟢 */}
      {/* Route(경로)는 페이지 */}
      <Routes>

        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <button style={{ border: "none", backgroundColor: "rgb(130, 54, 254)", height: "100px" }}
              onClick={e => {
                const copyShoes = [...shoes]; // 화살표 바꾸기 
                const sorting = copyShoes.sort((a, b) => a.title.localeCompare(b.title)); // 정렬
                setShoes(sorting); // 재렌더링
                // console.log(sorting)
              }}>가나다순 변경</button>

            {
              /* 🔴경고 배너  🔴 */
              alert ? <div style={{ height: "30px", backgroundColor: "red" }}>더이상 없슴다</div> : null

            }

            {/* 상품정보 */}
            <div div className="container">
              <div className="row">
                {shoes.map((e, i) => <Card shoes={e} navigate={navigate}></Card>)}
              </div>
            </div>
            {/* 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 */}
            <button onClick={() => {

              setCount(count++); // 눌렀을 때 자동 증가
              console.log(count)
              if (count <= 3) {
                axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
                  .then((result) => {
                    console.log(result.data)
                    let copyShoes = [...shoes]
                    setShoes([...copyShoes, ...result.data])
                  })
                  .catch(() => {
                    console.log('잘못된 요청 ㅅㄱ')
                  })
              } else if (count > 3) {
                setAlert(true)
              }
            }}>トタン</button>
          </>
        } />

        <Route path="/detail" element={
          <>
            <div div className="container" >
              <div className="row">
                {shoes.map((e, i) =>
                  <Card key={i} shoes={e} navigate={navigate}></Card>)}
              </div>
            </div>
          </>
        }>

        </Route>
        <Route path="/detail/:id" element={
          <>
            <div style={{ fontSize: "40px", backgroundColor: "rgb(47, 161, 242)", height: "100px", color: "white", lineHeight: "100px" }}>
              詳細ベージ</div>
            <Detail shoes={shoes} />    {/*🟡 Detail 컴포넌트  */}
          </>
        } ></Route>

        <Route path="/about" element={<About navigate={navigate} />}>
          <Route path="one" element={
            <>
              <h2>오늘의 이벤트</h2>
              <p>첫 주문시 양배추즙 서비스</p>
            </>
          } />
          <Route path="two" element={
            <>
              <h2>本日のイベント</h2>
              <p>初購買の場合キャベツのスープが！！！！</p>
            </>
          } />
        </Route>

        <Route path='*' element={
          <>
            <div className='main-bg' style={{ marginBottom: "100px" }}></div>
            <div style={{ fontSize: "150px" }}>ページがございません。</div>
          </>
        }></Route>

        <Route path='/cart' element={<Cart></Cart>}>

        </Route>
      </Routes>


    </div >
  ); // return
}

function About(props) {
  return (
    <div>
      <Outlet></Outlet>
      <h4 onClick={() => { props.navigate('/') }} >会社情報</h4>
      <Outlet></Outlet>
    </div>
  )
}



function Card(props) {
  return (
    <div className="col-md-4" style={{ marginBottom: "30px" }}>
      <div style={{ position: "relative", overflow: "hidden" }} onClick={(e) => {
        props.navigate(`/detail/${props.shoes.id}`);
      }} >
        <div className="overlay-wrap">
          <div className="overlay">{props.shoes.price}</div>
        </div>
        <img src={props.shoes.img} width="80%" alt='no' />
      </div>
      <h4>{props.shoes.title}</h4>
      <p></p>
    </div>
  )
}

export default App;
