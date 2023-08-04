import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../Styles/Cart.scss';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Cart = () => {
     const [counter, setCounter] = useState(1);
     const [userID, setUserID] = useState('');
     const [userEmail, setUserEmail] = useState('');
     //const [cartItems, setCartItems] = useState([]);
     const [cartItems_Full, setCartItems_Full] = useState([]);

     const [cartBrands, setCartBrands] = useState([]);

     function counterFunc(which) {
          const minusBut = document.querySelector('minusIcon');
          const counterInput = document.querySelector('counterInput');
          const plusBut = document.querySelector('plusIcon');

          if (which === 'minus') {
               if (counter > 1) {
                    setCounter(counter - 1);
               }
          } else {
               if (counter <= 9999) {
                    setCounter(counter + 1);
               }
          }
     }

     const location = useLocation();
     const thepath = location.pathname;

     useEffect(() => {
          //set title
          document.title = 'Cart - Solar Warehouse';
          const fetchProducts = async () => {
               try {
                    axios.get('http://localhost:8800/')
                         .then((res) => {
                              console.log(res.data);
                              if (res.data.Status == 'Success') {
                                   // Successful login
                                   //alert('Login successful');
                                   setUserID(res.data.id);
                                   setUserEmail(res.data.email);
                                   /*
                                   axios.get('http://localhost:8800/cart', {
                                        params: {
                                             userId: res.data.id,
                                        },
                                   })
                                        .then((response) => {
                                             console.log(response.data);
                                             //setCartItems(response.data);
                                             var brandList = [];
                                             response.data.forEach((eachData) => {
                                                  brandList.push(eachData.brandName);
                                             });

                                             const distinctList = Array.from(new Set(brandList));
                                             //console.log(distinctList);
                                             setCartBrands(distinctList);
                                        })
                                        .catch(function (error) {
                                             console.error('Error:', error);
                                             // Handle error
                                        });*/

                                   axios.get('http://localhost:8800/cartfull', {
                                        params: {
                                             userId: res.data.id,
                                        },
                                   })
                                        .then((response) => {
                                             console.log(response.data);
                                             setCartItems_Full(response.data);

                                             //get distinct brand list
                                             var brandList = [];
                                             response.data.forEach((eachData) => {
                                                  brandList.push(eachData.brandName);
                                             });
                                             const distinctList = Array.from(new Set(brandList));
                                             setCartBrands(distinctList);

                                             //calculate total amount cart
                                             const totalAmountText =
                                                  document.getElementById('totalAmountText');
                                             const totalNumItemText =
                                                  document.getElementById('totalNumItemText');

                                             var totalAmount = 0;
                                             response.data.forEach((element) => {
                                                  totalAmount += element.quantity * element.Price;
                                             });
                                             totalNumItemText.textContent =
                                                  'Total (' + response.data.length + ' items):';
                                             totalAmountText.textContent =
                                                  'RM ' + totalAmount.toFixed(2);
                                        })
                                        .catch(function (error) {
                                             // Handle error
                                             console.log('Error:', error);
                                        });
                              } else {
                                   console.log('Authentication failed');
                                   //guest's cart
                                   //set distinct guest's brand list
                                   var guestCart = localStorage.getItem('guestCart');
                                   const storedObject = JSON.parse(guestCart);

                                   var brandList = [];
                                   storedObject.forEach((eachData) => {
                                        brandList.push(eachData.brandName);
                                   });
                                   const distinctList = Array.from(new Set(brandList));
                                   setCartBrands(distinctList);
                                   console.log(distinctList);

                                   //get products list

                                   axios.get('http://localhost:8800/products')
                                        .then((response) => {
                                             var inCartProduct = [];
                                             var totalAmount = 0;

                                             response.data.forEach((eachItem) => {
                                                  var foundItem = storedObject.find(
                                                       (item) =>
                                                            item.productId == eachItem.IdProducts
                                                  );

                                                  if (typeof foundItem !== 'undefined') {
                                                       eachItem.quantity = 1;
                                                       inCartProduct.push(eachItem);
                                                       totalAmount += 1 * eachItem.Price;
                                                  }
                                             });
                                             console.log(inCartProduct);
                                             setCartItems_Full(inCartProduct);

                                             //calculate total amount cart
                                             const totalAmountText =
                                                  document.getElementById('totalAmountText');
                                             const totalNumItemText =
                                                  document.getElementById('totalNumItemText');

                                             totalNumItemText.textContent =
                                                  'Total (' + response.data.length + ' items):';
                                             totalAmountText.textContent =
                                                  'RM' + totalAmount.toFixed(2);
                                        })
                                        .catch(function (error) {
                                             // Handle error
                                             console.log('Error:', error);
                                        });
                              }
                         })
                         .catch(function (error) {
                              console.error('Error:', error);
                              // Handle error
                         });
               } catch (err) {
                    console.log(err);
               }
          };
          fetchProducts();
     }, [thepath]);

     //useEffect(() => {}, []);

     function checkout() {
          if (userID === '' || userID === null) {
               alert('Login to check out');
          } else {
               alert('Check out successfully');
          }
     }

     function calculateTotalAmount() {
          //set title
          const totalAmountText = document.getElementById('totalAmountText');
          const totalNumItemText = document.getElementById('totalNumItemText');

          const itemBox_all = document.querySelectorAll('.itemBox');
          //var saveList = [];
          var totalAmount = 0;
          var itemCount = 0;

          itemBox_all.forEach((eachItembox) => {
               const itemDiv_all = eachItembox.querySelectorAll('.itemContent .itemDiv');

               itemDiv_all.forEach((eachItemDiv) => {
                    const counterInput = eachItemDiv.querySelector('.numberDiv input');
                    const unitPriceText = eachItemDiv.querySelector('.unitPrice');
                    itemCount += 1;
                    totalAmount +=
                         parseInt(counterInput.value) * parseFloat(unitPriceText.textContent);
               });
          });

          //console.log(totalAmount);
          totalNumItemText.textContent = 'Total (' + itemCount + ' items):';
          totalAmountText.textContent = 'RM' + totalAmount.toFixed(2);
     }

     function fatherCheckClick() {
          const checkallbox = document.getElementById('checkallbox');

          var itemContainer1 = document.querySelectorAll('.brandCheckBox input');
          var itemContainer2 = document.querySelectorAll('.checkingBox input');

          if (checkallbox.checked === true) {
               itemContainer1.forEach((element) => {
                    element.checked = true;
               });
               itemContainer2.forEach((element) => {
                    element.checked = true;
               });
          } else {
               itemContainer1.forEach((element) => {
                    element.checked = false;
               });
               itemContainer2.forEach((element) => {
                    element.checked = false;
               });
          }

          /*var itemContainer = document.querySelector('.itemContainer');
          const itemBox_all = itemContainer.querySelectorAll('.itemBox');

          itemBox_all.forEach((eachItembox) => {
               const brandCheckbox = eachItembox.querySelector('.brandBox .brandCheckBox input');
               const itemDiv_all = eachItembox.querySelectorAll('.itemContent .itemDiv');

               brandCheckbox.checked = true;
               itemDiv_all.forEach((eachItemDiv) => {
                    const brandCheckbox = eachItemDiv.querySelector('.checkingBox input');

                    brandCheckbox.checked =true;

               });
          });*/

          /*var isallchecked = true;
          console.log(itemDiv_all);

          if (isallchecked) {
               parentCheck.checked = true;
          }*/
     }

     function saveAll() {
          const itemBox_all = document.querySelectorAll('.itemBox');
          var saveList = [];

          itemBox_all.forEach((eachItembox) => {
               const itemDiv_all = eachItembox.querySelectorAll('.itemContent .itemDiv');

               itemDiv_all.forEach((eachItemDiv) => {
                    const counterInput = eachItemDiv.querySelector('.numberDiv input');

                    const idText = eachItemDiv.querySelector('.idText');

                    var saveItem = {
                         userId: userID,
                         quantity: parseInt(counterInput.value),

                         IdCart: idText.textContent,
                    };
                    saveList.push(saveItem);
               });
          });
          //console.log(saveList);

          saveList.forEach((eachSave) => {
               axios.put('http://localhost:8800/cartupdate', eachSave)
                    .then((res) => {
                         console.log(res.data);
                    })
                    .catch(function (error) {
                         console.error('Error:', error);
                         // Handle error
                    });
          });
     }

     return (
          <div className='CartDiv'>
               <h2 className='title'>Cart</h2>
               <div className='contentDiv'>
                    <div className='titleDiv'>
                         <Form.Check // prettier-ignore
                              type='checkbox'
                              id='checkallbox'
                              label=''
                              className='mainCheckbox'
                              onClick={fatherCheckClick}
                         />
                         <h3 className='first'>Product</h3>
                         <h3>Unit Price</h3>
                         <h3>Quantity</h3>
                         <h3>Total Price</h3>
                    </div>
                    <div className='itemContainer'>
                         {cartBrands.map((eachBrand) => {
                              const handleCheck = (event) => {
                                   //itemBox
                                   var theparent = event.target.parentNode.parentNode.parentNode;

                                   const itemContent = theparent.querySelector('.itemContent');
                                   //console.log(itemContent);
                                   const itemDiv_all = itemContent.querySelectorAll('.itemDiv');

                                   itemDiv_all.forEach((eachItemDiv) => {
                                        const checkEle =
                                             eachItemDiv.querySelector('.checkingBox input');
                                        //console.log(checkEle);
                                        checkEle.checked = true;
                                   });
                              };

                              return (
                                   <div className='itemBox'>
                                        <div className='brandBox'>
                                             <Form.Check // prettier-ignore
                                                  type='checkbox'
                                                  id='rmbBox'
                                                  label=''
                                                  className='brandCheckBox'
                                                  onClick={handleCheck}
                                             />
                                             <h3>{eachBrand}</h3>
                                        </div>
                                        <div className='itemContent'>
                                             {cartItems_Full.map((eachItem) => {
                                                  if (
                                                       eachItem.Brand == eachBrand ||
                                                       eachItem.brandName == eachBrand
                                                  ) {
                                                       const handleCounterClick = (
                                                            event,
                                                            which
                                                       ) => {

                                                            if (userID === '' || userID === null) {
                                                                 alert('Login to add quantity');
                                                                 return;
                                                            }
                                                            var totalPrice =
                                                                 event.target.parentNode.parentNode.querySelector(
                                                                      '.totalPrice'
                                                                 );
                                                            var unitPrice =
                                                                 event.target.parentNode.parentNode.querySelector(
                                                                      '.unitPrice'
                                                                 );

                                                            var theparent = event.target.parentNode;
                                                            //const numberDiv = document.querySelector('.numberDiv');
                                                            const counterInput =
                                                                 theparent.querySelector('input');
                                                            var newcounter = parseInt(
                                                                 counterInput.value
                                                            );

                                                            //const plusBut = document.querySelector('plusIcon');

                                                            if (which === 'minus') {
                                                                 if (newcounter > 1) {
                                                                      newcounter -= 1;
                                                                 }
                                                            } else {
                                                                 if (newcounter <= 9999) {
                                                                      newcounter += 1;
                                                                 }
                                                            }

                                                            counterInput.value = newcounter;
                                                            var newTotalPrice =
                                                                 parseFloat(unitPrice.textContent) *
                                                                 newcounter;
                                                            totalPrice.textContent =
                                                                 'RM ' + newTotalPrice.toFixed(2);
                                                            calculateTotalAmount();
                                                            saveAll();
                                                       };

                                                       const handleChildCheck = (event) => {
                                                            var theparent =
                                                                 event.target.parentNode.parentNode
                                                                      .parentNode;
                                                            var theparent2 = theparent.parentNode;
                                                            const parentCheck =
                                                                 theparent2.querySelector(
                                                                      '.brandBox .brandCheckBox input'
                                                                 );
                                                            const itemDiv_all =
                                                                 theparent.querySelectorAll(
                                                                      '.itemDiv'
                                                                 );
                                                            if (event.target.checked === false) {
                                                                 parentCheck.checked = false;
                                                            }

                                                            var isallchecked = true;
                                                            console.log(itemDiv_all);
                                                            itemDiv_all.forEach((eachItemDiv) => {
                                                                 if (isallchecked === false) {
                                                                      return;
                                                                 }
                                                                 const checkEle =
                                                                      eachItemDiv.querySelector(
                                                                           '.checkingBox input'
                                                                      );
                                                                 console.log(checkEle);
                                                                 isallchecked = checkEle.checked
                                                                      ? true
                                                                      : false;
                                                            });

                                                            if (isallchecked) {
                                                                 parentCheck.checked = true;
                                                            }
                                                       };

                                                       return (
                                                            <div className='itemDiv'>
                                                                 <Form.Check // prettier-ignore
                                                                      type='checkbox'
                                                                      id='rmbBox'
                                                                      label=''
                                                                      className='checkingBox'
                                                                      onClick={(e) => {
                                                                           handleChildCheck(e);
                                                                      }}
                                                                 />
                                                                 <div className='imgDiv'>
                                                                      <img
                                                                           src={eachItem.Imgurl}
                                                                           alt=''
                                                                      />

                                                                      <h3
                                                                           className='idText'
                                                                           style={{
                                                                                display: 'none',
                                                                           }}
                                                                      >
                                                                           {eachItem.IdCart}
                                                                      </h3>
                                                                 </div>

                                                                 <h3>{eachItem.Title}</h3>
                                                                 <h4 className='unitPrice'>
                                                                      {eachItem.Price}
                                                                 </h4>
                                                                 <div class='numberDiv'>
                                                                      <AiOutlineMinus
                                                                           className='minusIcon'
                                                                           onClick={(e) => {
                                                                                handleCounterClick(
                                                                                     e,
                                                                                     'minus'
                                                                                );
                                                                           }}
                                                                      />
                                                                      <input
                                                                           type='text'
                                                                           id='counterInput'
                                                                           value={eachItem.quantity}
                                                                      />
                                                                      <AiOutlinePlus
                                                                           className='plusIcon'
                                                                           onClick={(e) => {
                                                                                handleCounterClick(
                                                                                     e,
                                                                                     'plus'
                                                                                );
                                                                           }}
                                                                      />
                                                                 </div>
                                                                 <h4 className='totalPrice'>
                                                                      RM{' '}
                                                                      {(
                                                                           eachItem.quantity *
                                                                           eachItem.Price
                                                                      ).toFixed(2)}
                                                                 </h4>
                                                            </div>
                                                       );
                                                  }
                                             })}
                                        </div>
                                   </div>
                              );
                         })}
                         {/* 
                         <div className='itemBox'>
                              <div className='brandBox'>
                                   <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='rmbBox'
                                        label=''
                                        className='checkingBox'
                                   />
                                   <h3>LG Electronic Inc.</h3>
                              </div>

                              <div className='itemDiv'>
                                   <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='rmbBox'
                                        label=''
                                        className='checkingBox'
                                   />
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1288/55dc897ed335a5432a2e7a8d5536a8fc.jpg'
                                        alt=''
                                   />
                                   <h3>ES-SEG-BAT-10K</h3>
                                   <h4>RM 3405.00</h4>
                                   <div class='numberDiv'>
                                        <AiOutlineMinus
                                             className='minusIcon'
                                             onClick={() => {
                                                  counterFunc('minus');
                                             }}
                                        />
                                        <input type='text' id='counterInput' value={counter} />
                                        <AiOutlinePlus
                                             className='plusIcon'
                                             onClick={() => {
                                                  counterFunc('plus');
                                             }}
                                        />
                                   </div>
                                   <h4 className='totalPrice'>RM 3405.00</h4>
                              </div>

                              <div className='itemDiv'>
                                   <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id='rmbBox'
                                        label=''
                                        className='checkingBox'
                                   />
                                   <img
                                        src='https://assets.solarbrain.com.au/uploads/photo_attachment/photo/1288/55dc897ed335a5432a2e7a8d5536a8fc.jpg'
                                        alt=''
                                   />
                                   <h3>ES-SEG-BAT-10K</h3>
                                   <h4>RM 3405.00</h4>
                                   <div class='numberDiv'>
                                        <AiOutlineMinus
                                             className='minusIcon'
                                             onClick={counterFunc}
                                        />
                                        <input type='text' />
                                        <AiOutlinePlus className='plusIcon' onClick={counterFunc} />
                                   </div>
                                   <h4 className='totalPrice'>RM 3405.00</h4>
                              </div>
                         </div>*/}
                    </div>
               </div>

               <div className='summaryDiv'>
                    <div className='leftDiv'>
                         
                         <h3>Delete All</h3>
                    </div>
                    <div className='rightDiv'>
                         <div>
                              <h3 id='totalNumItemText'>Total ( items):</h3>
                              <h2 id='totalAmountText'>RM -</h2>
                         </div>

                         <button onClick={checkout}>
                              Check Out
                              <FaArrowRight />
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default Cart;
