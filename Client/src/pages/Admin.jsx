import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.scss';
import Form from 'react-bootstrap/Form';

const Admin = () => {
     function addProductData() {
          var url_GET = document.getElementById('urlInput').value;
          var title_GET = document.getElementById('titleInput').value;
          var subtitle_GET = document.getElementById('subtitleInput').value;
          var price_GET = document.getElementById('priceInput').value;
          var category_GET = document.getElementById('categoryInput').value;
          var brand_GET = document.getElementById('brandInput').value;

          axios.post('http://localhost:8800/admindata', {
               Title: title_GET,
               Subtitle: subtitle_GET,
               Imgurl: url_GET,
               Price: price_GET,
               Category: category_GET,
               Brand: brand_GET,
          })
               .then((response) => {
                    //setMessage(response.data.message);
                    console.log(response.data);
                    alert('Add to product database');
                    //window.location.reload();
               })
               .catch((error) => {
                    //setMessage('An error occurred during registration.');
                    console.error(error);
               });
     }

     function addBrandData() {
          var brandName_GET = document.getElementById('brandnameInput').value;
          var descriptionP_GET = document.getElementById('descripInput').value;
          var descriptionPoint_GET = document.getElementById('descripPointInput').value;
          var brandImg_GET = document.getElementById('brandImgInput').value;
          var brandCategory_GET = document.getElementById('brandcategoryInput').value;
          var brandShort_GET = document.getElementById('brandshortInput').value;

          axios.post('http://localhost:8800/adminbranddata', {
               BrandName: brandName_GET,
               Description_p: descriptionP_GET,
               Description_point: descriptionPoint_GET,
               Img: brandImg_GET,
               Category: brandCategory_GET,
               BrandShort: brandShort_GET,
          })
               .then((response) => {
                    //setMessage(response.data.message);
                    console.log(response.data);
                    alert('Add to brand database');
                    //window.location.reload();
               })
               .catch((error) => {
                    //setMessage('An error occurred during registration.');
                    console.error(error);
               });
     }

     return (
          <div className='AdminDiv'>
               <section className='contentDiv'>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Img Url</label>
                         <input type='text' id='urlInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Title</label>
                         <input type='text' id='titleInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Subtitle</label>
                         <input type='text' id='subtitleInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Price</label>
                         <input type='text' id='priceInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Category</label>
                         <Form.Select aria-label='Default select example' id='categoryInput'>
                              <option></option>
                              <option value='Module'>Module</option>
                              <option value='inverter'>inverter</option>
                              <option value='Storage'>Storage</option>
                              <option value='mounting'>mounting</option>
                              <option value='charger'>charger</option>
                              <option value='electrical'>electrical</option>
                         </Form.Select>
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Brand</label>
                         <input type='text' id='brandInput' />
                    </div>
                    <button onClick={addProductData}>Add Product data</button>
               </section>
               <section className='contentDiv'>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Brand Name</label>
                         <input type='text' id='brandnameInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Description_p</label>
                         <input type='text' id='descripInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Description_point</label>
                         <input type='text' id='descripPointInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Img</label>
                         <input type='text' id='brandImgInput' />
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>Category</label>
                         <Form.Select aria-label='Default select example' id='brandcategoryInput'>
                              <option></option>
                              <option value='Module'>Module</option>
                              <option value='inverter'>inverter</option>
                              <option value='Storage'>Storage</option>
                              <option value='mounting'>mounting</option>
                              <option value='charger'>charger</option>
                              <option value='electrical'>electrical</option>
                         </Form.Select>
                    </div>
                    <div className='inputBox'>
                         <label htmlFor='urlInput'>BrandShort</label>
                         <input type='text' id='brandshortInput' />
                    </div>
                    <button onClick={addBrandData}>Add brand data</button>
               </section>
          </div>
     );
};

export default Admin;
