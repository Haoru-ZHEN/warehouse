import React, { useEffect, useState } from 'react';
import '../Styles/BrandDetail.scss';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BrandDetail = () => {
     const [Branddetails, setBranddetails] = useState([]);
     const location = useLocation();
     const brandId = location.pathname.split('/')[2];

     useEffect(() => {
          //set title
          document.title = 'Brands - Solar Warehouse';

          const fetchBrandDetail = async () => {
               try {
                    const res = await axios.get('http://localhost:8800/brands/' + brandId);
                    setBranddetails(res.data[0]);
                    console.log(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          fetchBrandDetail();
     }, []);

     return (
          <div className='BrandDetailDiv'>
               <section className='parts section1'>
                    <div className='leftDiv'>
                         <img src={Branddetails.Img} alt='' />
                    </div>
                    <div className='rightDiv'>
                         <p>{Branddetails.Description_p}</p>
                    </div>
               </section>
               <section className='parts section2'>
                    <div className='textDiv'>
                         <h3>Products</h3>
                         <h4>pricing are excluded GST and for local stock only.</h4>
                    </div>
                    <div class='grid_container'>
                         <div class='gridItem' onclick='goProduct()'>
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
                         </div>
                    </div>
               </section>
          </div>
     );
};

export default BrandDetail;
