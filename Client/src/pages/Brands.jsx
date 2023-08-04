import React, { useEffect, useState } from 'react';
import '../Styles/Brands.scss';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Brands = () => {
     const [Allbrands, setBrands] = useState([]);
     const navigate = useNavigate();

     function goBrand(theId){
          navigate('/brands/' + theId);

     }

     useEffect(() => {
          /*const moduleImg = document.querySelector('.moduleImg');
          const inverterImg = document.querySelector('.inverterImg');
          const storageImg = document.querySelector('.storageImg');
          const mountingImg = document.querySelector('.mountingImg');
          const chargerImg = document.querySelector('.chargerImg');
          const electricalImg = document.querySelector('.electricalImg');*/

          //set title
          document.title = 'Brands - Solar Warehouse';

          const fetchProducts = async () => {
               try {
                    const res = await axios.get('http://localhost:8800/brands');
                    setBrands(res.data);
                    console.log(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          fetchProducts();
     }, []);
     return (
          <div className='BrandDiv'>
               <section class='content' id='fullpage'>
                    <section class='parts section1'>
                         <h3>Solar Modules</h3>
                         <span class='line'></span>
                         <div class='imgDiv moduleImg'>
                              {/* 
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1518/logo_000eee2aadb7e77fc01402b08e9e0ec2.png'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/229/logo_ded7b289a7a57077d95d1a3fc6d48001.png'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1359/logo_b291ce977fcb8f5e89db7599af7a0b4c.png'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/251/logo_0fc7b6857441fb6f48248390890ad1e7.png'
                                   alt=''
                              />*/}
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'module') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>

                         <h3>Solar Inverters</h3>
                         <span class='line'></span>
                         <div class='imgDiv inverterImg'>
                              {/* 
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/259/logo_e4844061ceeb5af9880f1f60a77fb414.jpeg'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/238/logo_c15f2a4787399a778ce199602f3afec7.jpeg'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/211/logo_86ea9621133e640e6e01e34cdba12fda.png'
                                   alt=''
                              />
                              <img
                                   src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1353/logo_9d54547c9174966362bf2e47b2a7a883.png'
                                   alt=''
                              />*/}
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'inverter') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>
                         <h3>Storage</h3>
                         <span class='line'></span>
                         <div className='imgDiv storageImg'>
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'storage') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>
                         <h3>Mountings</h3>
                         <span class='line'></span>
                         <div className='imgDiv mountingImg'>
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'mounting') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>
                         <h3>EV Chargers</h3>
                         <span class='line'></span>
                         <div className='imgDiv chargerImg'>
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'charger') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>
                         <h3>Electricals</h3>
                         <span class='line'></span>
                         <div className='imgDiv electricalImg'>
                              {Allbrands.map((eachBrand) => {
                                   if (eachBrand.Category.toLowerCase() == 'electrical') {
                                        return <img src={eachBrand.Img} alt='' onClick={() =>
                                             goBrand(eachBrand.IdBrands)
                                        }/>
                                        ;
                                   }
                                   return null;
                              })}
                         </div>
                    </section>
               </section>
          </div>
     );
};

export default Brands;
