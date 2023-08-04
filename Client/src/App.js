import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Products from './pages/Products';
import ItemDetail from './pages/ItemDetail';
import Brands from './pages/Brands';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BrandDetail from './pages/BrandDetail';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './pages/Profile';
import Verification from './pages/Verification';

function App() {
     const [auth, setAuth] = useState(false);
     const [message, setMessage] = useState('');
     const [useremail, setEmail] = useState('');
     const [UserID, setUserID] = useState('');

     axios.defaults.withCredentials = true;

     function showPopupProfile() {
          const popupProfile = document.querySelector('.popupProfile');
          /*
          if(popupProfile.style.display == 'none' || ''){
               popupProfile.style.display = 'flex';
          }else{
               popupProfile.style.display = 'none';

          }*/ 
          /*popupProfile.style.display =
               popupProfile.style.display == 'none' || popupProfile.style.display == ''
                    ? 'flex'
                    : 'none';*/
          /*
          if (auth == true) {
               if (popupProfile.style.opacity == '0' || popupProfile.style.opacity =='') {
                    popupProfile.style.opacity = '1';
               } else {
                    popupProfile.style.opacity = '0';
               }
               
               popupProfile.addEventListener(
                    'transitionend',
                    function () {
                         if (popupProfile.style.opacity === '0') {
                              popupProfile.style.display = 'none';
                         }else{
                              popupProfile.style.display = 'flex';
                         }
                    },
                    { once: true }
               );
          }*/
     }

     useEffect(() => {
          const popupProfile = document.querySelector('.popupProfile');
          const siginLi = document.querySelector('.siginLi');

          axios.get('http://localhost:8800/')
               .then((res) => {
                    //console.log(res.data)

                    if (res.data.Status == 'Success') {
                         // Successful login
                         //alert('Login successful');
                         setAuth(true);

                         //console.log(res.data.email);
                         setEmail(res.data.email);
                         setUserID(res.data.id);
                         //console.log('isLogin');

                         var rightPosition = siginLi.getBoundingClientRect().left;
                         popupProfile.style.left = parseFloat(rightPosition) - 100 + 'px';
                    } else {
                         // Failed login
                         //console.log('failed')
                         popupProfile.style.display = 'none'
                         setAuth(false);
                         setMessage(res.data);
                    }
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, []);

     const location = useLocation();
     const movieId = location.pathname.split('/')[2];
     const thepath = location.pathname;
     const navigate = useNavigate();

     function logout() {
          axios.get('http://localhost:8800/logout')
               .then((res) => {
                    navigate('/');
                    window.location.reload();
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }

     useEffect(() => {
          const popupProfile = document.querySelector('.popupProfile');
          const siginLi = document.querySelector('.siginLi');

          axios.get('http://localhost:8800/')
               .then((res) => {
                    //console.log(res.data)

                    if (res.data.Status == 'Success') {
                         // Successful login
                         //alert('Login successful');
                         setAuth(true);

                         //console.log(res.data.email);
                         setEmail(res.data.email);
                         var rightPosition = siginLi.getBoundingClientRect().left;
                         popupProfile.style.left = parseFloat(rightPosition) - 80 + 'px';
                    } else {
                         // Failed login
                         setAuth(false);
                         setMessage(res.data);
                    }
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, [thepath]);

     return (
          <div className='App'>
               {thepath != '/login' && (
                    <header>
                         <div class='firstHead'>
                              <ul>
                                   <li
                                        className='siginLi'
                                        onMouseEnter={showPopupProfile}
                                        onMouseLeave={showPopupProfile}
                                   >
                                        {auth ? (
                                             <a href=''>{useremail}</a>
                                        ) : (
                                             <Link to='/login'>Sign In</Link>
                                        )}
                                        <div className='popupProfile'>
                                             <ul>
                                                  <li>
                                                       <Link to='/profile'>Profile</Link>
                                                  </li>
                                                  <li onClick={logout}>Logout</li>
                                             </ul>
                                        </div>
                                   </li>

                                   <li>
                                        <a href='#'>Terms & Conditions</a>
                                   </li>
                                   <li>
                                        <a href='#'>Privacy Policy</a>
                                   </li>
                              </ul>
                         </div>

                         <Navbar theid={UserID} />
                    </header>
               )}
               <div className='containAll'>
                    <Routes>
                         <Route path='/' element={<Home />} />
                         <Route path='/products' element={<Products />} />
                         <Route path='/products/:itemId' element={<ItemDetail />} />

                         <Route path='/brands' element={<Brands />} />
                         <Route path='/admin' element={<Admin />} />
                         <Route path='/cart' element={<Cart />} />
                         <Route path='/login' element={<Login />} />
                         <Route path='/profile' element={<Profile />} />
                         <Route path='/verification' element={<Verification />} />

                         <Route path='/brands/:brandId' element={<BrandDetail />} />
                    </Routes>
               </div>
          </div>
     );
}

export default App;
