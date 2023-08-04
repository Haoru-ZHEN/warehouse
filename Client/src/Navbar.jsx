import React, { useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAddShoppingCart } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import axios from 'axios';

const Navbar = (props) => {
     
     useEffect(() => {
          const cartBadge = document.querySelector('.cartBadge');
          const cartBadgeText = document.querySelector('.cartBadge h4');

          if(props.theid === null || props.theid === '' ){
               var guestCart = localStorage.getItem('guestCart') !== null ? localStorage.getItem('guestCart') : [];
               const storedObject = JSON.parse(guestCart);
               //cartBadge.style.display = 'none'
               cartBadgeText.textContent = storedObject.length
          }else{
            axios.get('http://localhost:8800/cart', {
               params: {
                    userId: props.theid,
               },
          })
               .then((response) => {
                    console.log(response.data);
                    console.log(response.data.length)
                    cartBadge.style.display = 'flex'
                    cartBadgeText.textContent = response.data.length
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });   
          }
          
     },[props.theid])
     


     return (
          <nav className='navBarDiv'>

               <div class='secondHeader'>
                    <img
                         src='https://assets.onestopwarehouse.com/assets/images/home/logo.png'
                         alt=''
                    />
                    <ul className='ulSecond'>
                         <CustomLink to='/'>Home</CustomLink>
                         <CustomLink to='/products'>Products</CustomLink>
                         <CustomLink to='/brands'>Brands</CustomLink>
                         <CustomLink to='/brands'>Downloads</CustomLink>
                         <CustomLink to='/brands'>About Us </CustomLink>
                         <CustomLink to='/brands'>News</CustomLink>
                         <CustomLink to='/brands'>Events</CustomLink>

                    </ul>
                    <ul class='rightUl'>
                         <li>
                              <div class='searchBar'>
                                   <svg
                                        aria-hidden='true'
                                        class='pre-nav-design-icon'
                                        focusable='false'
                                        viewBox='0 0 24 24'
                                        role='img'
                                        width='24px'
                                        height='24px'
                                        fill='none'
                                   >
                                        <path
                                             stroke='currentColor'
                                             stroke-width='1.5'
                                             d='M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853'
                                        ></path>
                                   </svg>
                                   <input type='text' placeholder='Search' />
                              </div>
                         </li>
                         <li>
                              <svg
                                   aria-hidden='true'
                                   class='pre-nav-design-icon'
                                   focusable='false'
                                   viewBox='0 0 24 24'
                                   role='img'
                                   width='24px'
                                   height='24px'
                                   fill='none'
                              >
                                   <path
                                        stroke='currentColor'
                                        stroke-width='1.5'
                                        d='M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451'
                                   ></path>
                              </svg>
                         </li>
                         <li>
                              <Link to={'/cart'}>
                                   <AiOutlineShoppingCart
                                        className='allicon'
                                        size={'70'}
                                        style={{ fill: '#0188cc' }}
                                   />
                                   <div className="cartBadge">
                                        <h4></h4>
                                   </div>
                              </Link>
                         </li>
                    </ul>
               </div>
          </nav>
     );
};

function CustomLink({ to, children, ...props }) {
     const resolvedPath = useResolvedPath(to);
     const isActive = useMatch({ path: resolvedPath.pathname });
     return (
          <li>
               <Link to={to} className={isActive ? 'activeTab' : ''} {...props}>
                    {children}
               </Link>
          </li>
     );
}

export default Navbar;
