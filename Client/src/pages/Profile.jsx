import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../Styles/Profile.scss';

const Profile = () => {
     const [userID, setUserID] = useState('');
     const [userInfo, setUserInfo] = useState({});

     useEffect(() => {
          axios.get('http://localhost:8800/')
               .then((res) => {
                    //console.log(res.data)
                    setUserID(res.data.id);
                    //const emailInput = document.getElementById('emailInput');
                    //emailInput.value = res.data.email;

                    axios.get('http://localhost:8800/profile', {
                         params: {
                              userId: res.data.id,
                         },
                    })
                         .then((response) => {
                              setUserInfo(response.data[0]);
                         })
                         .catch(function (error) {
                              console.error('Error:', error);
                              // Handle error
                         });
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, []);

     function he(){
          console.log(userInfo);

     }

     return (
          <div className='ProfileDiv'>
               <div className='contentDiv'>
                    <h2>Profile</h2>
                    <div className='part1'>
                         <div className='titleDiv'>
                              <span className='profile'></span>
                         </div>
                         <div>
                              <h3 className='labelH3'>Username</h3>
                              <h3 className='valueH3'>{userInfo.username}</h3>
                              <h3 className='editH3'>Edit username</h3>
                         </div>
                    </div>

                    <div className='part1'>
                         <div className='titleDiv'>
                              <h4>Account Info</h4>
                         </div>
                         <div>
                              <h3 className='labelH3'>Email address</h3>
                              <h3 className='valueH3'>{userInfo.email}</h3>
                              <h3 className='editH3'>-</h3>
                         </div>
                         <div>
                              <h3 className='labelH3'>Phone number</h3>
                              <h3 className='valueH3'>+{userInfo.mobileNum}</h3>
                              <h3 className='editH3'>Edit Phone number</h3>
                         </div>
                         <div>
                              <h3 className='labelH3'>Password</h3>
                              <h3 className='valueH3'>*****</h3>
                              <h3 className='editH3'>Edit password</h3>
                         </div>
                    </div>
                    <div className='part1'>
                         <div className='titleDiv'>
                              <h4>Company Info</h4>
                         </div>
                         <div>
                              <h3 className='labelH3'>Company name</h3>
                              <h3 className='valueH3'>{userInfo.companyName}</h3>
                              <h3 className='editH3'>Edit company name</h3>
                         </div>
                         <div>
                              <h3 className='labelH3'>Company registration No. (SSM)</h3>
                              <h3 className='valueH3'>{userInfo.MSIC}</h3>
                              <h3 className='editH3'>Edit number</h3>
                         </div>
                    </div>
                    <div className='part1'>
                         <div className='titleDiv'>
                              <h4>Address Info</h4>
                         </div>
                         <div>
                              <h3 className='labelH3'>Delivery address</h3>
                              <h3 className='valueH3'>No.4, Jalan</h3>
                              <h3 className='editH3'>Edit address</h3>
                         </div>
                         <div>
                              <h3 className='labelH3'>Billing address</h3>
                              <h3 className='valueH3'>No.4, Jalan</h3>
                              <h3 className='editH3'>Edit address</h3>
                         </div>
                    </div>
                    {/* 
                    <FloatingLabel controlId='floatingInput' label='Email address' className='mb-3'>
                         <Form.Control
                              type='email'
                              placeholder='name@example.com'
                              id='emailInput'
                         />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Password'>
                         <Form.Control type='password' placeholder='Password' id='pwdInput' />
                    </FloatingLabel>*/}
                    <button className='saveBut' onClick={he}>Save Profile</button>
               </div>
          </div>
     );
};

export default Profile;
