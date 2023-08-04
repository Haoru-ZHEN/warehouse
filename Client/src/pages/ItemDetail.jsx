import React, { useState } from 'react';
import '../Styles/ItemDetail.scss';
import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsCartPlus } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';

const ItemDetail = () => {
     const location = useLocation();
     const productId = location.pathname.split('/')[2];
     console.log(productId);
     const [aproduct, setProduct] = useState([]);
     const [userID, setUserID] = useState('');
     const [userEmail, setUserEmail] = useState('');
     const [cartItems, setCartItems] = useState([]);

     useEffect(() => {
          document.title = 'Product - Solar Warehouse';

          const fetchProduct = async () => {
               try {
                    const res = await axios.get('http://localhost:8800/products/' + productId);
                    setProduct(res.data[0]);
                    console.log(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          fetchProduct();

          axios.get('http://localhost:8800/')
               .then((res) => {
                    console.log(res.data);
                    if (res.data.Status == 'Success') {
                         // Successful login
                         //alert('Login successful');
                         setUserID(res.data.id);
                         setUserEmail(res.data.email);

                         axios.get('http://localhost:8800/cart', {
                              params: {
                                   userId: res.data.id,
                              },
                         })
                              .then((response) => {
                                   console.log(response.data);
                                   setCartItems(response.data);
                              })
                              .catch(function (error) {
                                   console.error('Error:', error);
                                   // Handle error
                              });
                    } else {
                         console.log('Guest user');
                         console.log(userID);
                    }
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, []);

     function addCart() {
          if (userID === '' || userID === null) {
               var guestCart =
                    localStorage.getItem('guestCart') !== null
                         ? localStorage.getItem('guestCart')
                         : [];
               console.log(guestCart);
               const storedObject = JSON.parse(guestCart);
               console.log(storedObject);

               toGuestCart(storedObject);
               console.log(localStorage.getItem('guestCart'));
          } else {
               toUserCart();
          }
     }

     function toGuestCart(theCart) {
          let PRODUCTID_GET = productId;
          const timestamp = Date.now();

          const foundItem = theCart.find((item) => item.productId === PRODUCTID_GET);
          console.log(foundItem);
          /*
          if (typeof foundItem !== 'undefined') {
               var itemData = {
                    quantity: parseInt(foundItem.quantity) + 1,
                    date: timestamp,
                    IdCart: foundItem.IdCart,
                    productId: PRODUCTID_GET,
               }
               
               theCart.push(itemData);
          } else {
               var itemData = {
                    email: userEmail,
                    userId: userID,
                    productId: PRODUCTID_GET,
                    quantity: 1,
                    date: timestamp,
                    brandName: aproduct.Brand,
               }

               theCart.push(itemData);
          }*/

          if (typeof foundItem === 'undefined') {
               var itemData = {
                    email: userEmail,
                    userId: userID,
                    productId: PRODUCTID_GET,
                    quantity: 1,
                    date: timestamp,
                    brandName: aproduct.Brand,
               };

               theCart.push(itemData);
          }

          alert('Add to cart');

          // Store the array in local storage
          localStorage.setItem('guestCart', JSON.stringify(theCart));
     }

     function toUserCart() {
          let PRODUCTID_GET = productId;
          const timestamp = Date.now();
          const foundItem = cartItems.find((item) => item.productId === PRODUCTID_GET);
          //const cartId = foundItem ? foundItem.IdCart : null;
          //console.log(foundItem);
          //console.log(cartId);

          if (typeof foundItem !== 'undefined') {
               axios.put('http://localhost:8800/product/cartupdate', {
                    quantity: parseInt(foundItem.quantity) + 1,
                    date: timestamp,
                    IdCart: foundItem.IdCart,
                    productId: PRODUCTID_GET,
               })
                    .then((res) => {
                         console.log(res.data);
                         alert('Add to cart');
                    })
                    .catch(function (error) {
                         console.error('Error:', error);
                         // Handle error
                    });
          } else {
               axios.post('http://localhost:8800/product/addcart', {
                    email: userEmail,
                    userId: userID,
                    productId: PRODUCTID_GET,
                    quantity: 1,
                    date: timestamp,
                    brandName: aproduct.Brand,
               })
                    .then((response) => {
                         //setMessage(response.data.message);
                         console.log(response.data);
                         alert('Add to cart');
                         //window.location.reload();
                    })
                    .catch((error) => {
                         //setMessage('An error occurred during registration.');
                         console.error(error);
                    });
          }
     }

     function specClick(num, event) {
          const clicked_li = event.currentTarget;
          const specificationDiv = document.querySelector('.specificationDiv');
          const specificationDiv_ul = specificationDiv.querySelector('ul');
          const specificationDiv_li = specificationDiv_ul.querySelectorAll('li');
          const descripDiv = specificationDiv.querySelector('.descripDiv');
          const brandDiv = specificationDiv.querySelector('.brandDiv');

          specificationDiv_li.forEach((li) => {
               li.classList.remove('activeSpec');
          });

          clicked_li.classList.add('activeSpec');

          if (num === 1) {
               descripDiv.style.display = 'flex';
               brandDiv.style.display = 'none';
          } else {
               descripDiv.style.display = 'none';
               brandDiv.style.display = 'flex';
          }
     }

     return (
          <div className='ItemDetailDiv'>
               <section class='content' id='fullpage'>
                    <section class='parts section1'>
                         <div class='detailDiv'>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                   <div className='imgDiv'>
                                        <img src={aproduct.Imgurl} alt='' />
                                   </div>

                                   <div class='detailText'>
                                        <h3>{aproduct.Title}</h3>
                                        {/*
                                        <div className='h3Div'>
                                             
                                             <img
                                                  src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1257/logo_473c62719aff2bcdc2badd938c4faa14.jpg'
                                                  alt=''
                                             />
                                        </div>*/}

                                        <h4>{aproduct.Subtitle}</h4>
                                        {/*<span>{aproduct.Brand}</span>*/}

                                        <div className='priceDiv'>
                                             <h2>RM {aproduct.Price}</h2>
                                             <h5>In Stock</h5>
                                        </div>

                                        <button onClick={addCart}>
                                             <BsCartPlus className='addCartIcon' />
                                             Add to cart
                                        </button>
                                   </div>
                              </div>

                              <div className='docDiv'>
                                   <h3>Document Certificate</h3>
                                   <ul>
                                        <li>
                                             <h4>Installation Manual</h4>
                                             <a href='#'>
                                                  Installation Manual.pdf <FiDownload />
                                             </a>
                                        </li>
                                        <li>
                                             <h4>Warranty Document</h4>
                                             <a href='#'>
                                                  Warranty Document.pdf <FiDownload />
                                             </a>
                                        </li>
                                        <li>
                                             <h4>Datasheet</h4>
                                             <a href='#'>
                                                  Datasheet.pdf <FiDownload />
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                         <div class='specificationDiv'>
                              <ul>
                                   <li class='activeSpec' onClick={(e) => specClick(1, e)}>
                                        Product Description
                                   </li>
                                   <li onClick={(e) => specClick(2, e)}>Product Brand</li>
                              </ul>
                              <div class='descripDiv'>
                                   <h4>{aproduct.Subtitle}</h4>
                                   <span>Specification</span>
                                   <div class='specDiv'>
                                        <div>
                                             <h3>Battery Type</h3>
                                             <h4>LV</h4>
                                        </div>
                                        <div>
                                             <h3>Battery Capacity</h3>
                                             <h4>6.50 kWh</h4>
                                        </div>
                                   </div>

                                   <span>Shipping Information</span>
                                   <div class='specDiv'>
                                        <div>
                                             <h3>CEC Model</h3>
                                             <h4>RESU6.5</h4>
                                        </div>
                                        <div></div>
                                   </div>
                                   <span>
                                        Warranty Information(Please refer to the warranty document
                                        from the manufacture)
                                   </span>
                                   <div class='specDiv'>
                                        <div>
                                             <h3>Product Warranty</h3>
                                             <h4>10 Year(s)</h4>
                                        </div>
                                        <div>
                                             <h3>Performance Warranty</h3>
                                             <h4>10 Year(s)</h4>
                                        </div>
                                   </div>
                              </div>
                              <div class='brandDiv'>
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1257/logo_473c62719aff2bcdc2badd938c4faa14.jpg'
                                        alt=''
                                   />
                                   <p>
                                        Energy Storage System(ESS) stores electric energy and
                                        utilize them for later consumption. It is purposed to
                                        improve energy efficiency, by enhancing the quality of
                                        renewable energy that results stabilisation of power supply
                                        system. LG RESU provides most optimal energy solution for
                                        the users using our state-of-the-art energy storage system
                                        with a long lifespan and a top-notch quality.
                                   </p>
                              </div>
                         </div>
                    </section>
               </section>
          </div>
     );
};

export default ItemDetail;
