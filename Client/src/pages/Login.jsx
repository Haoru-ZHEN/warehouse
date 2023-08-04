import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiChevronLeft } from 'react-icons/bi';

const Login = () => {
     const navigate = useNavigate();
     axios.defaults.withCredentials = true;

     useEffect(() => {
          var signinDiv = document.querySelector('.signinDiv');
          var signupDiv = document.querySelector('.signupDiv');
          signinDiv.style.transform = 'translateX(0px)';
          signupDiv.style.transform = 'translateY(-450px) translateX(-430px)';
     });

     function mobileInputFocus() {
          const mobileInput = document.getElementById('mobileInput');
          const prefix = document.getElementById('prefix');
          const mobileInputLabel = document.getElementById('mobileInputLabel');
          mobileInputLabel.style.top = '-8px';
          prefix.textContent = '+60';
          prefix.classList.add('focus');
     }

     function mobileInputBlur() {
          const mobileInput = document.getElementById('mobileInput');
          const prefix = document.getElementById('prefix');
          const mobileInputLabel = document.getElementById('mobileInputLabel');

          if (mobileInput.checkValidity()) {
               mobileInputLabel.style.top = '-8px';
          } else {
               mobileInputLabel.style.top = '50%';
               prefix.textContent = '';
          }
          prefix.classList.remove('focus');
     }

     function validation() {
          var nameInput = document.getElementById('nameInput');
          var addressInput = document.getElementById('addressInput');
          var mobileInput = document.getElementById('mobileInput');
          var companyNameInput = document.getElementById('companyNameInput');
          var msicInput = document.getElementById('msicInput');
          var stateBox = document.getElementById('stateBox');
          var hearBox = document.getElementById('hearBox');
          var installBox = document.getElementById('installBox');
          var passwordInput = document.getElementById('passwordInput');
          var cfmInput = document.getElementById('cfmInput');

          if (nameInput.value === '') {
               nameInput.style.borderColor = 'red';
          } else {
               nameInput.style.borderColor = '';
          }

          if (addressInput.value === '') {
               addressInput.style.borderColor = 'red';
          } else {
               addressInput.style.borderColor = '';
          }

          if (mobileInput.value === '') {
               mobileInput.style.borderColor = 'red';
          } else {
               mobileInput.style.borderColor = '';
          }

          if (companyNameInput.value === '') {
               companyNameInput.style.borderColor = 'red';
          } else {
               companyNameInput.style.borderColor = '';
          }

          if (msicInput.value === '') {
               msicInput.style.borderColor = 'red';
          } else {
               msicInput.style.borderColor = '';
          }

          if (stateBox.value === '') {
               stateBox.style.borderColor = 'red';
          } else {
               stateBox.style.borderColor = '';
          }

          if (hearBox.value === '') {
               hearBox.style.borderColor = 'red';
          } else {
               hearBox.style.borderColor = '';
          }

          if (installBox.value === '') {
               installBox.style.borderColor = 'red';
          } else {
               installBox.style.borderColor = '';
          }

          if (passwordInput.value === '') {
               passwordInput.style.borderColor = 'red';
          } else {
               passwordInput.style.borderColor = '';
          }

          if (cfmInput.value === '') {
               cfmInput.style.borderColor = 'red';
          } else {
               cfmInput.style.borderColor = '';
          }

          if (
               nameInput.value === '' ||
               addressInput.value === '' ||
               mobileInput.value === '' ||
               companyNameInput.value === '' ||
               msicInput.value === '' ||
               stateBox.value === '' ||
               hearBox.value === '' ||
               installBox.value === '' ||
               passwordInput.value === '' ||
               cfmInput.value === ''
          ) {
               return false;
          }

          return true;
     }

     function authenticate() {
          var email = document.getElementById('emailInput').value;
          var password = document.getElementById('pwdInput').value;

          axios.post('http://localhost:8800/login', { email: email, password: password })
               .then(function (response) {
                    if (response.data.Status === 'Success') {
                         // Successful login
                         //window.location.reload()
                         navigate('/');
                    } else if (response.data.Status === 'Not verified') {
                         alert('This email is not verified yet');
                    } else {
                         // Failed login
                         alert('Invalid credentials');
                    }
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }

     function register() {
          var NAME_GET = document.getElementById('nameInput').value;
          var EMAIL_GET = document.getElementById('addressInput').value;
          var MOBILE_GET = document.getElementById('mobileInput').value;
          var COMPANYNAME_GET = document.getElementById('companyNameInput').value;
          var MSIC_GET = document.getElementById('msicInput').value;
          var stateBox_GET = document.getElementById('stateBox').value;
          var hearBox_GET = document.getElementById('hearBox').value;
          var installBox_GET = document.getElementById('installBox').value;
          var PASSWORD_GET = document.getElementById('passwordInput').value;
          var CONFIRM_GET = document.getElementById('cfmInput').value;
          const agreeBox = document.getElementById('agreeBox');

          if (validation()) {
               if (MOBILE_GET.length < 9 || MOBILE_GET.length > 10) {
                    console.log('wrong phone');
                    return alert('Invalid Contact Number Format');
               } else if (!agreeBox.checked) {
                    return alert('Check the box to agree our Terms of Service and Privacy Policy');
               } else {
                    axios.post('http://localhost:8800/isexist', { email: EMAIL_GET })
                         .then(function (response) {
                              if (response.data.Status === 'Exist') {
                                   alert('This email is existed');
                              } else {
                                   if (PASSWORD_GET === CONFIRM_GET) {
                                        console.log(response.data);

                                        axios.post('http://localhost:8800/register', {
                                             email: EMAIL_GET,
                                             password: PASSWORD_GET,
                                             username: NAME_GET,
                                             mobileNum: '60' + MOBILE_GET,
                                             companyName: COMPANYNAME_GET,
                                             msic: MSIC_GET,
                                             state: stateBox_GET,
                                             howHear: hearBox_GET,
                                             howInstall: installBox_GET,
                                             verified: false,
                                        })
                                             .then((res) => {
                                                  console.log(res.data);
                                                  var guestCart =
                                                       localStorage.getItem('guestCart') !== null
                                                            ? localStorage.getItem('guestCart')
                                                            : [];
                                                  const storedObject = JSON.parse(guestCart);
                                                  storedObject.forEach((eachCartitem) => {
                                                       axios.post(
                                                            'http://localhost:8800/product/addcart',
                                                            {
                                                                 email: EMAIL_GET,
                                                                 userId: res.data.Id,
                                                                 productId: eachCartitem.productId,
                                                                 quantity: 1,
                                                                 date: eachCartitem.date,
                                                                 brandName: eachCartitem.brandName,
                                                            }
                                                       )
                                                            .then((ress) => {
                                                                 console.log(ress.data);
                                                                 //window.location.reload();
                                                            })
                                                            .catch((error) => {
                                                                 console.error(error);
                                                            });
                                                  });
                                                  alert(
                                                       'Register successfully, Check your email and click the link to verify'
                                                  );
                                                  localStorage.removeItem('guestCart');
                                                  window.location.reload();
                                             })
                                             .catch((error) => {
                                                  //setMessage('An error occurred during registration.');
                                                  console.error(error);
                                             });
                                   } else {
                                        alert('Password not matching');
                                   }
                              }
                         })
                         .catch(function (error) {
                              console.error('Error:', error);
                              // Handle error
                         });
               }
          }
     }

     function goSignin() {
          var signinDiv = document.querySelector('.signinDiv');
          var signupDiv = document.querySelector('.signupDiv');
          var leftDiv = document.querySelector('.leftDiv');
          var transformValue = signinDiv.style.transform;
          var rotateValue = transformValue.match(/translateX\((.*?)\)/);
          console.log(rotateValue);

          var degree = parseFloat(rotateValue[1]);

          if (degree == 0) {
               leftDiv.style.overflowY = 'auto';
               signinDiv.style.transform = 'translateX(430px)';
               signupDiv.style.transform = 'translateY(-450px) translateX(0)';
          } else {
               leftDiv.style.overflowY = 'hidden';
               signinDiv.style.transform = 'translateX(0px)';
               signupDiv.style.transform = 'translateY(-450px) translateX(-430px)';
          }
     }

     useEffect(() => {
          document.title = 'Login - Solar Warehouse';
     });

     //https://colorlib.com/etc/regform/colorlib-regform-36/
     return (
          <div className='LoginDiv'>
               <div className='contentDiv'>
                    <div className='leftDiv'>
                         <div className='signinDiv'>
                              <a className='sign_a' onClick={goSignin}>
                                   New User? <span>Sign Up</span>
                              </a>
                              <div className='imgDiv'>
                                   <Link to='/'>
                                        <img
                                             src='https://assets.onestopwarehouse.com/assets/images/home/logo.png'
                                             alt=''
                                        />
                                   </Link>
                              </div>

                              <input
                                   id='emailInput'
                                   type='text'
                                   placeholder='Email'
                                   required
                                   className='inputDetail'
                              />
                              <input
                                   id='pwdInput'
                                   type='password'
                                   placeholder='Password'
                                   required
                                   className='inputDetail'
                              />
                              {/*<span className='rmbDiv'>
                                   <input type='checkbox' id='rmbCheckbox' />
                                   <label htmlFor='rmbCheckbox'>Remember Me</label>
                              </span>*/}
                              <Form.Check // prettier-ignore
                                   type='checkbox'
                                   id='rmbBox'
                                   label='Remember Me'
                              />
                              <div className='butDiv'>
                                   <button onClick={authenticate}>Log in</button>
                              </div>
                              <a className='forgot_a'>Forgot password?</a>
                         </div>

                         <div className='signupDiv'>
                              <div className='iconDiv'>
                                   <BiChevronLeft
                                        size={30}
                                        className='backIcon'
                                        onClick={goSignin}
                                   />
                              </div>
                              <h2>Sign up</h2>
                              <div class='input-box'>
                                   <input id='nameInput' type='text' required />
                                   <label id='symbolInputLabel'>Name</label>
                              </div>
                              <div class='input-box'>
                                   <input id='addressInput' type='text' required />
                                   <label id='symbolInputLabel'>Email Address</label>
                              </div>
                              <div class='input-box'>
                                   <div>
                                        <span id='prefix'></span>
                                        <input
                                             id='mobileInput'
                                             type='text'
                                             required
                                             onFocus={mobileInputFocus}
                                             onBlur={mobileInputBlur}
                                        />
                                   </div>

                                   <label id='mobileInputLabel'>Mobile No. / Contact Number</label>
                              </div>
                              <div class='input-box'>
                                   <input id='companyNameInput' type='text' required />
                                   <label id='symbolInputLabel'>Company Name</label>
                              </div>
                              <div class='input-box'>
                                   <input id='msicInput' type='text' required />
                                   <label id='symbolInputLabel'>Company No. (SSM)</label>
                              </div>
                              <div className='stateDiv'>
                                   <label>State</label>
                                   <Form.Select
                                        aria-label='Default select example'
                                        id='stateBox'
                                        data-show-content='true'
                                   >
                                        <option></option>
                                        <option value='Perlis'>Perlis</option>
                                        <option data-content="<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Perlis.svg/1200px-Flag_of_Perlis.svg.png'/> Cutlery"></option>
                                        <option value='Kedah'>
                                             <BiChevronLeft />
                                             Kedah
                                        </option>
                                        <option value='Penang'>Penang</option>
                                        <option value='Perak'>Perak</option>
                                        <option value='Selangor'>Selangor</option>
                                        <option value='Negeri Sembilan'>Negeri Sembilan</option>
                                        <option value='Malacca'>Malacca</option>
                                        <option value='Johor'>Johor</option>
                                        <option value='Kelantan'>Kelantan</option>
                                        <option value='Terengganu'>Terengganu</option>
                                        <option value='Pahang'>Pahang</option>
                                        <option value='Sabah'>Sabah</option>
                                        <option value='Sarawak'>Sarawak</option>
                                   </Form.Select>

                                   <div className='stateDiv'>
                                        <label>How did you hear about us</label>
                                        <Form.Select
                                             aria-label='Default select example'
                                             id='hearBox'
                                        >
                                             <option></option>
                                             <option value='1'>Google</option>
                                             <option value='2'>Event</option>
                                             <option value='3'>Social Media</option>
                                             <option value='4'>Recommendation</option>
                                             <option value='5'>Advert / Press</option>
                                        </Form.Select>
                                   </div>
                                   <div className='stateDiv'>
                                        <label>
                                             How many installations do you install on a weekly base
                                        </label>
                                        <Form.Select
                                             aria-label='Default select example'
                                             id='installBox'
                                        >
                                             <option></option>
                                             <option value='1'>Less than two jobs</option>
                                             {/*{String.fromCharCode(60)} 2*/}
                                             <option value='2'>Between two to ten jobs</option>
                                             <option value='3'>More than ten jobs</option>
                                        </Form.Select>{' '}
                                   </div>
                              </div>

                              <div class='input-box'>
                                   <input id='passwordInput' type='text' required />
                                   <label id='symbolInputLabel'>Password</label>
                              </div>
                              <div class='input-box'>
                                   <input id='cfmInput' type='text' required />
                                   <label id='symbolInputLabel'>Confirm Password</label>
                              </div>
                              <Form.Check // prettier-ignore
                                   type='checkbox'
                                   id='agreeBox'
                                   label='By signing up to Solar Warehouse, you agree to our Terms of Service and Privacy Policy'
                              />
                              <button onClick={register}>Register</button>
                         </div>
                    </div>
                    <div className='rightDiv'>
                         <h2>ONE STOP WAREHOUSE</h2>
                         <p>
                              WE ARE ONE OF THE LARGEST SOLAR WHOLESALER IN MALAYSIA. OUR VISION
                              REMAINS BEING A TRUE WHOLESALE PARTNER THAT EMPOWERS OUR CUSTOMERS BY
                              OFFERING EXCELLENT VALUE AND SERVICE
                         </p>
                         {/*
                         <InputGroup className='mb-3'>
                              <InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
                              <Form.Control
                                   placeholder='Username'
                                   aria-label='Username'
                                   aria-describedby='basic-addon1'
                              />
                         </InputGroup>
                         <Form.Check // prettier-ignore
                              type='checkbox'
                              id='rmbBox'
                              label='Remember Me'
                         /> */}
                    </div>
               </div>
          </div>
     );
};

export default Login;
