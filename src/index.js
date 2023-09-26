import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // 이렇게 경로가 아예 없는 것들은 라이브러리 
import { Provider } from 'react-redux';
import store from './store.js'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


const queryClient = new QueryClient() //2 번


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* 3번 */}
      <Provider store={store}>
        <BrowserRouter> {/* </BrowserRouter>로 감싸기  */}
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
