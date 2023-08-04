import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Styles/Verification.scss';

const Verification = () => {
     const [isVerify, setVerify] = useState(false);
     const location = useLocation();
     //const thepath = location.pathname;
     const searchParams = new URLSearchParams(location.search);
     const gettoken = searchParams.get('token');
     console.log(gettoken);

     useEffect(() => {
          /*axios.get('http://localhost:8800/verification', {
               params: {
                    token: gettoken,
               },
          })
               .then((response) => {
                    console.log(response.data);
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });*/

          axios.put('http://localhost:8800/verification', {
               verified: true,
               token: gettoken,
          })
               .then((res) => {
                    console.log(res);
                    if(res.data.Status !== 'Not exists'){
                         setVerify(true)
                    }
                    
               })
               .catch(function (error) {
                    console.error('Error:', error);
                    // Handle error
               });
     }, []);

     return (
          <div className='VerificationDiv'>
               {isVerify?
               <div className='successDiv'>
                    <img
                         src='https://icon-library.com/images/verified-icon-png/verified-icon-png-5.jpg'
                         alt=''
                    />
                    <h3>Email is verified succcessfully</h3>
                    <button>
                         <a href='/login'>Log in</a>
                    </button>
               </div>:
               <div className='failDiv'>
                    <img
                         src={process.env.PUBLIC_URL + "/failVerify.svg"}
                         alt=''
                    />
                    <h3>Email is failed to verify</h3>
                    <button>
                         <a href='/login'>Log in</a>
                    </button>
               </div>}
          </div>
     );
};

export default Verification;
