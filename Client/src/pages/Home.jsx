import React, { useEffect, useState } from 'react';
//import Swiper from 'swiper/bundle';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { BiChevronRight } from 'react-icons/bi';
import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Styles/Home.scss';

const Home = () => {
     const [currentSideTitle, setSideTitle] = useState('');
     const [auth, setAuth] = useState(false);
     const [message, setMessage] = useState('');
     const [useremail, setEmail] = useState('');
     axios.defaults.withCredentials = true;

     function showSide(sideTitle = '') {
          const showDiv = document.querySelector('.showDiv');
          const thetitle = document.getElementById('sideTitle');

          //console.log(sideTitle)
          if (sideTitle != '') {
               //setSideTitle(sideTitle);
               thetitle.textContent = sideTitle;
          }

          if (showDiv.style.display == 'flex') {
               //showDiv.style.opacity = 0;
               //showDiv.style.zIndex = -1;
               showDiv.style.display = 'none';
          } else {
               //showDiv.style.opacity = 1;
               //showDiv.style.zIndex = 5;
               showDiv.style.display = 'flex';
          }
     }

     const pagination = {
          clickable: true,
          renderBullet: function (index, className) {
               return '<span class=' + className + '></span>';
          },
     };

     useEffect(() => {
          document.title = 'Solar Warehouse';

          axios.get('http://localhost:8800/')
               .then((res) => {
                    console.log(res.data)
                    if (res.data.Status == 'Success') {
                         // Successful login
                         //alert('Login successful');
                         setAuth(true);
                         setEmail(res.data.email);
                    } else {
                         setAuth(false);
                         setMessage(res.data);
                    }
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, []);

     return (
          <div className='HomeDiv'>
               <section class='content'>
                    <section class='parts section1'>
                         <ul>
                              <li>Buy</li>
                              <li
                                   onMouseEnter={() => showSide('Solar Modules')}
                                   onMouseLeave={() => showSide('Solar Modules')}
                              >
                                   Solar Modules
                                   <BiChevronRight size={20} />
                              </li>
                              <li
                                   onMouseEnter={() => showSide('Solar Inverters')}
                                   onMouseLeave={() => showSide('Solar Inverters')}
                              >
                                   Solar Inverters
                                   <BiChevronRight size={20} />
                              </li>
                              <li>Storage</li>
                              <li
                                   onMouseEnter={() => showSide('Mountings')}
                                   onMouseLeave={() => showSide('Mountings')}
                              >
                                   Mountings
                                   <BiChevronRight size={20} />
                              </li>
                              <li>EV Chargers</li>
                              <li>Electricals</li>
                         </ul>
                         <div
                              className='showDiv'
                              onMouseEnter={() => showSide()}
                              onMouseLeave={() => showSide()}
                         >
                              <div className='textDiv'>
                                   <h3 id='sideTitle'>Solar Module</h3>
                                   <a href='/products'>All</a>
                              </div>
                              <div className='gridContainer'>
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1518/logo_000eee2aadb7e77fc01402b08e9e0ec2.png'
                                        alt=''
                                   />
                              </div>
                         </div>
                         <div>
                              <Swiper
                                   spaceBetween={0}
                                   slidesPerView={1}
                                   speed={500}
                                   loop={true}
                                   navigation={false}
                                   touchRatio={1.5}
                                   effect={'flip'}
                                   pagination={pagination}
                                   className='myswiper'
                                   modules={[Autoplay, EffectFade, Pagination, Navigation]}
                                   autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                   }}
                              >
                                   <SwiperSlide
                                        className='aslide'
                                        style={{
                                             backgroundImage:
                                                  "url('https://assets.onestopwarehouse.com/assets/images/home_banners/tw_solar-20230127.jpeg')",
                                        }}
                                   ></SwiperSlide>
                                   <SwiperSlide
                                        className='aslide'
                                        style={{
                                             backgroundImage:
                                                  "url('https://assets.onestopwarehouse.com/assets/images/home_banners/Wallbox-20230127.png')",
                                        }}
                                   ></SwiperSlide>
                                   <SwiperSlide
                                        className='aslide'
                                        style={{
                                             backgroundImage:
                                                  "url('https://assets.onestopwarehouse.com/assets/images/home_banners/goodwe-20230127.jpeg')",
                                        }}
                                   ></SwiperSlide>
                              </Swiper>
                         </div>
                         <div class='rightDiv'>
                              <img
                                   src='https://assets.onestopwarehouse.com/assets/images/new_home/quick_buy_en.png'
                                   alt=''
                              />
                              <img
                                   src='https://assets.onestopwarehouse.com/assets/images/new_home/easy_pay_en.png'
                                   alt=''
                              />
                         </div>
                    </section>
                    <section class='parts section2'>
                         <div class='contentDiv'>
                              <div class='productItem'>
                                   <Link to={'/products?category=module'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_solar_modules_home-8dde94c6613ac1aedee09b65f08201bedc9de99465086f82bd72b10bac45ff34.png'
                                             alt=''
                                        />
                                        <h3>Solar Modules</h3>
                                   </Link>
                              </div>
                              <div class='productItem'>
                                   <Link to={'/products?category=inverter'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_solar_inverters_home-33e994e7f3ba086a031f796a256f076f1a7682a7fd23b52044d616d60c463848.png'
                                             alt=''
                                        />
                                        <h3>Solar Inverters</h3>
                                   </Link>
                              </div>
                              <div class='productItem'>
                                   <Link to={'/products?category=storage'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_storage_home-e99d9648cb824aa3bb06a04dd12ec586c3dc4291d6975df49479a2f8ea528f1f.png'
                                             alt=''
                                        />
                                        <h3>Storages</h3>
                                   </Link>
                              </div>
                              <div class='productItem'>
                                   <Link to={'/products?category=mounting'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_solar_mountings_home-b5db7d80824c5116cc5586fee03525e77937fe5b12bc3ee6cf7f498acdac0a3a.png'
                                             alt=''
                                        />
                                        <h3>Mountings</h3>
                                   </Link>
                              </div>
                              <div class='productItem'>
                                   <Link to={'/products?category=charger'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_ev_chargers_home-de1fe86bcf366981f22f38122d3f5e205c04a9b05d7b078b071b9c4707c319cb.png'
                                             alt=''
                                        />
                                        <h3>EV Chargers</h3>
                                   </Link>
                              </div>
                              <div class='productItem'>
                                   <Link to={'/products?category=electrical'}>
                                        <img
                                             src='https://www.solarbrain.com.au/assets/home/btn_electricals_home-a03fe8b7d5ae00b0348537b57b624921dbb3038db03ad83b94310dff046f6011.png'
                                             alt=''
                                        />
                                        <h3>Electricals</h3>
                                   </Link>
                              </div>
                         </div>
                    </section>
               </section>
          </div>
     );
};

export default Home;
