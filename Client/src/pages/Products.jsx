import React from 'react';
import '../Styles/Products.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineDocumentText } from 'react-icons/hi';

const Products = () => {
     /*const [allproducts, setProducts] = useState({
          Title: '',
          Subtitle: '',
          Price: 0,
          Imgurl: 'https://poster.gsc.com.my/2023/230307_GuardiansOfTheGalaxyVol3_big.jpg',
          Category: 0,
     });*/
     var parts = [];

     const [allproducts, setProducts] = useState([]);
     const [resultNum, setresultNum] = useState(0);

     const location = useLocation();
     const thepath = location.pathname;
     const searchParams = new URLSearchParams(location.search);
     const getcategory = searchParams.get('category');
     var combinePath = thepath + '/' + getcategory;
     console.log(combinePath);

     if (getcategory != null && getcategory != '') {
          var isSplittable = getcategory.includes('_');
          if (isSplittable) {
               parts = getcategory.split('_');
          } else {
               parts.push(getcategory);
          }
     }
     console.log(parts);

     const navigate = useNavigate();

     function goProduct(theId) {
          navigate('/products/' + theId);
          //navigate('/products/d', { state: { name: 'Gwen Stacy', selectSeat: selectedSeatList } });
     }

     function goCategory(whichCategory) {
          //var count = 0;
          //var str = 'storage_module';
          console.log(getcategory);
          console.log(whichCategory);

          if (getcategory == null || getcategory == '') {
               navigate('/products?category=' + whichCategory);
               console.log('empty');
          } else {
               if (parts.length >= 1) {
                    parts = getcategory.split('_');

                    if (parts.includes(whichCategory)) {
                         parts = parts.filter((item) => item !== whichCategory);
                    } else {
                         parts.push(whichCategory);
                    }

                    const finalPath = parts.join('_');
                    navigate('/products?category=' + finalPath);
               } else {
                    parts.push(whichCategory);
                    navigate('/products?category=' + whichCategory);
               }
               /*
               const isSplittable = getcategory.includes('_');
               if (isSplittable) {
                    parts = getcategory.split('_');

                    if (parts.includes(whichCategory)) {
                         parts = parts.filter((item) => item !== whichCategory);
                    } else {
                         parts.push(whichCategory);
                    }

                    const finalPath = parts.join('_');
                    navigate('/products?category=' + finalPath);
               } else {
                    navigate('/products?category=' + whichCategory);
                    //parts.push(whichCategory)
               }*/
               console.log(parts);
               console.log(isSplittable);
          }
     }
     //goCategory();

     useEffect(() => {
          //calculate result number
          const gridContainer = document.querySelector('.grid_container');
          const numberItem = gridContainer.querySelectorAll('.gridItem').length;
          setresultNum(numberItem);

          //set active to selected category
          const productItem_all = document.querySelectorAll('.productItem');
          productItem_all.forEach((eachProductItem) => {
               var eachProductItemH3 = eachProductItem.querySelector('h3');
               var eachProductItemInput = eachProductItem.querySelector('input');

               eachProductItemH3.style.color = '#000';
               eachProductItemInput.checked = false;
          });
          parts.forEach((part) => {
               switch (part) {
                    case 'module':
                         var thetext = productItem_all[0].querySelector('h3');
                         var theinput = productItem_all[0].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;
                    case 'inverter':
                         var thetext = productItem_all[1].querySelector('h3');
                         var theinput = productItem_all[1].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;
                    case 'storage':
                         var thetext = productItem_all[2].querySelector('h3');
                         var theinput = productItem_all[2].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;

                    case 'mounting':
                         var thetext = productItem_all[3].querySelector('h3');
                         var theinput = productItem_all[3].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;
                    case 'charger':
                         var thetext = productItem_all[4].querySelector('h3');
                         var theinput = productItem_all[4].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;

                    case 'electrical':
                         var thetext = productItem_all[5].querySelector('h3');
                         var theinput = productItem_all[5].querySelector('input');
                         thetext.style.color = '#0188cc';
                         theinput.checked = true;
                         break;
               }
          });
     }, [getcategory]);

     useEffect(() => {
          //calculate result number
          const gridContainer = document.querySelector('.grid_container');
          var numberItem = gridContainer.querySelectorAll('.gridItem').length;
          setresultNum(numberItem);

          //set title
          document.title = 'Products - Solar Warehouse';

          const fetchProducts = async () => {
               try {
                    const res = await axios.get('http://localhost:8800/products');
                    setProducts(res.data);
                    //console.log(res.data);
                    if (parts.length == 0) {
                         setresultNum(res.data.length);
                         console.log('one item');
                    } else {
                         var counting = 0;
                         res.data.map((eachProduct) => {
                              console.log(eachProduct);

                              if (parts.includes(eachProduct.Category.toLowerCase())) {
                                   counting += 1;
                              }
                         });
                         setresultNum(counting);
                         console.log(counting);
                    }
               } catch (err) {
                    console.log(err);
               }
          };
          fetchProducts();
     }, []);
     return (
          <div className='ProductDiv'>
               <section class='content' id='fullpage'>
                    <section class='parts section1'>
                         <div class='contentDiv'>
                              <h3>Product Classes:</h3>
                              <div class='productItem' onClick={() => goCategory('module')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_solar_modules_home-8dde94c6613ac1aedee09b65f08201bedc9de99465086f82bd72b10bac45ff34.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>Solar Modules</h3>
                                   </div>
                              </div>
                              <div class='productItem' onClick={() => goCategory('inverter')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_solar_inverters_home-33e994e7f3ba086a031f796a256f076f1a7682a7fd23b52044d616d60c463848.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>Solar Inverters</h3>
                                   </div>
                              </div>
                              <div class='productItem' onClick={() => goCategory('storage')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_storage_home-e99d9648cb824aa3bb06a04dd12ec586c3dc4291d6975df49479a2f8ea528f1f.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>Storages</h3>
                                   </div>
                              </div>
                              <div class='productItem' onClick={() => goCategory('mounting')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_solar_mountings_home-b5db7d80824c5116cc5586fee03525e77937fe5b12bc3ee6cf7f498acdac0a3a.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>Mountings</h3>
                                   </div>
                              </div>
                              <div class='productItem' onClick={() => goCategory('charger')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_ev_chargers_home-de1fe86bcf366981f22f38122d3f5e205c04a9b05d7b078b071b9c4707c319cb.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>EV Chargers</h3>
                                   </div>
                              </div>
                              <div class='productItem' onClick={() => goCategory('electrical')}>
                                   <img
                                        src='https://www.solarbrain.com.au/assets/home/btn_electricals_home-a03fe8b7d5ae00b0348537b57b624921dbb3038db03ad83b94310dff046f6011.png'
                                        alt=''
                                   />
                                   <div>
                                        <input type='checkbox' />
                                        <h3>Electricals</h3>
                                   </div>
                              </div>
                         </div>
                    </section>

                    <section class='parts section2'>
                         <div class='brandDiv'>
                              <h3>Product Brands</h3>
                              <div class='brandItem'>
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/254/logo_ed108d26c507478bdba55f25bd02331d.jpg'
                                        alt=''
                                   />
                              </div>
                              <div class='brandItem'>
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/244/logo_5d6d8d75553d9ef613e06ffc3cd04893.png'
                                        alt=''
                                   />
                              </div>
                              <div class='brandItem'>
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1353/logo_9d54547c9174966362bf2e47b2a7a883.png'
                                        alt=''
                                   />
                              </div>
                         </div>
                         <div class='itemsDiv'>
                              <div class='resultTextDiv'>
                                   <h3>Showing 1-21 of {resultNum} results</h3>
                              </div>
                              <div class='grid_container'>
                                   {/*<div class='gridItem' onclick='goProduct()'>
                                        <img
                                             src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/514/a34186d8c55c8ce82f6688b23b68886d.png'
                                             alt=''
                                        />
                                        <h3>ES-LGC-RESU6.5-LV</h3>
                                        <h4>LG RESU 6.5kWh LV Battery</h4>
                                        <a href='#'>
                                             <i class='uil uil-file'></i>Datasheet
                                        </a>
                                        <h2>RM 500.00</h2>
                                   </div>*/}
                                   {allproducts.map((eachProduct) => {
                                        if (parts.length == 0) {
                                             return (
                                                  <div
                                                       class='gridItem'
                                                       onClick={() =>
                                                            goProduct(eachProduct.IdProducts)
                                                       }
                                                  >
                                                       <img src={eachProduct.Imgurl} alt='' />
                                                       <h3>{eachProduct.Title}</h3>
                                                       <h4>{eachProduct.Subtitle}</h4>
                                                       <a href='#'>
                                                            <HiOutlineDocumentText className='fileIcon' />
                                                            Datasheet
                                                       </a>
                                                       <h2>RM {eachProduct.Price}</h2>
                                                  </div>
                                             );
                                        } else {
                                             if (
                                                  parts.includes(
                                                       eachProduct.Category.toLowerCase()
                                                  ) ||
                                                  eachProduct.Category.toLowerCase() == getcategory
                                             ) {
                                                  return (
                                                       <div
                                                            class='gridItem'
                                                            onClick={() =>
                                                                 goProduct(eachProduct.IdProducts)
                                                            }
                                                       >
                                                            <img src={eachProduct.Imgurl} alt='' />
                                                            <h3>{eachProduct.Title}</h3>
                                                            <h4>{eachProduct.Subtitle}</h4>
                                                            <a href='#'>
                                                                 <HiOutlineDocumentText className='fileIcon' />
                                                                 Datasheet
                                                            </a>
                                                            <h2>RM {eachProduct.Price}</h2>
                                                       </div>
                                                  );
                                             }
                                        }

                                        return null;
                                   })}
                              </div>
                         </div>
                    </section>
               </section>
          </div>
     );
};

export default Products;
