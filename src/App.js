import { useEffect } from 'react';

import {Route, Routes} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchMe } from './redux/slices/authSLice';

import Layout from './Layouts/Layout';
import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import './scss/app.scss';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  })
  
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/cart' element={<Cart/>}/> 
        <Route path='/pizza/:id' element={<FullPizza/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='*' element={<NotFound/>}/> 
      </Routes>

      <ToastContainer position='bottom-right'/>
    </Layout>
  );
}

export default App;
