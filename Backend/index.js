import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import sendEmail from './utils/sendEmail.js';

const app = express();
const salt = 10;
//const randomstring = require('randomstring');
//const sendEmail = require('./utils/sendEmail');

const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: ,
     database: ,
});

app.use(express.json());
app.use(
     cors({
          origin: ['http://localhost:3000'],
          methods: ['POST', 'GET', 'PUT'],
          credentials: true,
     })
);
app.use(cookieParser());

const verifyUser = (req, res, next) => {
     const token = req.cookies.token;
     if (!token) {
          return res.json({ Error: 'Failed to authenticated' });
     } else {
          jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
               if (err) {
                    return res.json({ Error: 'Token is hacked' });
               } else {
                    req.theemail = decoded.theemail;
                    req.theid = decoded.theid;
                    //console.log(decoded.theemail);
                    next();
               }
          });
     }
};

app.get('/', verifyUser, (req, res) => {
     return res.json({ Status: 'Success', email: req.theemail, id: req.theid });
});

app.get('/logout', (req, res) => {
     res.clearCookie('token');
     return res.json({ Status: 'Success' });
});

app.get('/profile', (req, res) => {
     const userId = req.query.userId;

     const q = 'SELECT * FROM users where IdUser = ?';
     db.query(q, [userId], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});

app.put('/verification', (req, res) => {
     const q = 'UPDATE users SET `verified` = ? WHERE token = ?';
     const values = [req.body.verified, req.body.token];

     db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);
          if (data.affectedRows === 0) {
               //return res.json('No matching record found');
               return res.json({ Status: 'Not exists' });
             }
          //return res.json('Successfully updated');
          return res.json({ Status: 'Success' });
     });
});

app.post('/admindata', (req, res) => {
     const q =
          'INSERT INTO products (`Title`,`Subtitle`,`Imgurl`,`Price`,`Category`,`Brand`) VALUES (?)';

     const values = [
          req.body.Title,
          req.body.Subtitle,
          req.body.Imgurl,
          req.body.Price,
          req.body.Category,
          req.body.Brand,
     ];

     db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully create');
     });
});

app.post('/adminbranddata', (req, res) => {
     const q =
          'INSERT INTO brands (`BrandName`,`Description_p`,`Description_point`,`Img`,`Category`,`BrandShort`) VALUES (?)';

     const values = [
          req.body.BrandName,
          req.body.Description_p,
          req.body.Description_point,
          req.body.Img,
          req.body.Category,
          req.body.BrandShort,
     ];

     db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully create');
     });
});

app.get('/products', (req, res) => {
     const q = 'SELECT * FROM products';
     db.query(q, (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});

app.get('/products/:itemid', (req, res) => {
     const itemid = req.params.itemid;

     const q = 'SELECT * FROM products WHERE IdProducts = ?';

     db.query(q, [itemid], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});

app.post('/product/addcart', (req, res) => {
     const q =
          'INSERT INTO cart (`email`,`userId`,`productId`,`quantity`,`date`,`brandName`) VALUES (?)';

     //const values = [req.body.email, req.body.password];
     const values = [
          req.body.email,
          req.body.userId,
          req.body.productId,
          req.body.quantity,
          req.body.date,
          req.body.brandName,
     ];

     db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json({Status:'Successfully create'});
     });
});

app.put('/product/cartupdate', (req, res) => {
     //const userId = req.params.userId;

     const q = 'UPDATE cart SET `quantity` = ?, `date` = ? WHERE IdCart = ? AND productId = ?';
     const values = [req.body.quantity, req.body.date, req.body.IdCart, req.body.productId];

     db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully updated');
     });
});

app.get('/brands', (req, res) => {
     const q = 'SELECT * FROM brands ORDER BY BrandName;';
     db.query(q, (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});

app.get('/brands/:brandid', (req, res) => {
     const brandid = req.params.brandid;

     const q = 'SELECT * FROM brands WHERE IdBrands = ?';

     db.query(q, [brandid], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});

app.get('/cart', (req, res) => {
     const userId = req.query.userId;

     const q = 'SELECT * FROM cart where userId = ? ORDER BY date DESC';
     db.query(q, [userId], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});
app.get('/cartfull', (req, res) => {
     const userId = req.query.userId;

     const q =
          'SELECT * FROM warehouse.cart AS table1 LEFT JOIN warehouse.products AS table2 ON table1.productId = table2.IdProducts where userId = ?';
     db.query(q, [userId], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
     });
});


app.put('/cartupdate', (req, res) => {
     //const userId = req.params.userId;

     const q = 'UPDATE cart SET `userId`=?,`quantity` = ? WHERE IdCart = ?';
     const values = [req.body.userId, req.body.quantity, req.body.IdCart];

     db.query(q, [...values], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully updated');
     });
});
/*
app.post('/login', (req, res) => {
     const { email, password } = req.body;
     const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

     db.query(query, [email, password], (err, results) => {
          if (err) {
               console.error('Error executing query:', err);
               res.status(500).json({ message: 'Internal server error' });
               return;
          }
          if (results.length === 0) {
               // User not found or invalid credentials
               res.status(401).json({ message: 'Invalid credentials' });
          } else {
               // Successful login
               res.status(200).json({ message: 'Login successful' });
          }
     });
});
*/
app.post('/login', (req, res) => {
     //const { email, password } = req.body;
     const query = 'SELECT * FROM users WHERE email = ?';

     db.query(query, [req.body.email], (err, data) => {
          if (err) {
               console.error('Error executing query:', err);
               res.status(500).json({ message: 'Internal server error' });
               return;
          }
          if (data.length > 0) {
               // User not found or invalid credentials
               //console.log(data[0]);
               bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                    if (err) {
                         return res.json({ Error: 'comparing error' });
                    }

                    
                    if (response) {
                         if(data[0].verified){
                           var theemail = data[0].email;
                         var theid = data[0].IdUser;
                         const token = jwt.sign({ theemail, theid }, 'jwt-secret-key', {
                              expiresIn: '1d',
                         });
                         res.cookie('token', token);
                         return res.json({ Status: 'Success' });   
                         }else{
                              return res.json({ Status: 'Not verified' });   

                         }
                         
                    } else {
                         return res.json({ Error: 'Password wrong' });
                    }
               });
          } else {
               // Successful login
               return res.json({ message: 'Email not existed' });
          }
     });
});

app.post('/isexist', (req, res) => {
     //const { email, password } = req.body;
     const query = 'SELECT * FROM users WHERE email = ?';

     db.query(query, [req.body.email], (err, data) => {
          if (err) {
               console.error('Error executing query:', err);
               res.status(500).json({ message: 'Internal server error' });
               return;
          }
          if (data.length > 0) {
               return res.json({ Status: 'Exist'});
          } else {
               // Successful login
               return res.json({ Status: 'Not Exist' });
          }
     });
});
/*
app.post('/register', (req, res) => {
     const q =
          'INSERT INTO users (`email`,`password`,`username`,`mobileNum`,`companyName`,`MSIC`,`state`,`howHear`,`howInstall`,`verified`) VALUES (?)';
     bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
          if (err) {
               res.json({ Error: 'Hashing error' });
          }

          const values = [
               req.body.email,
               hash,
               req.body.username,
               req.body.mobileNum,
               req.body.companyName,
               req.body.msic,
               req.body.state,
               req.body.howHear,
               req.body.howInstall,
               req.body.verified,

          ];

          db.query(q, [values], (err, data) => {
               if (err) return res.json(err);
               return res.json('Successfully create');
          });
     });
});*/

app.post('/register', (req, res) => {
     const q =
          'INSERT INTO users (`email`,`password`,`username`,`mobileNum`,`companyName`,`MSIC`,`state`,`howHear`,`howInstall`,`verified`) VALUES (?)';
     bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
          if (err) {
               res.json({ Error: 'Hashing error' });
          }

          //const values = [req.body.email, req.body.password];
          const values = [
               req.body.email,
               hash,
               req.body.username,
               req.body.mobileNum,
               req.body.companyName,
               req.body.msic,
               req.body.state,
               req.body.howHear,
               req.body.howInstall,
               req.body.verified,
          ];

          db.query(q, [values], (err, result) => {
               if (err) {
                    return res.json(err);
               } else {
                    let mailSubject = 'Warehouse - Mail Verification';
                    const randomToken = Randomstring.generate();

                    let content =
                         'Click the link below to verify your email\nhttp://localhost:3000/verification?token=' +
                         randomToken;

                    sendEmail(req.body.email, mailSubject, content);
                    db.query(
                         'UPDATE users SET token=? where email=?',
                         [randomToken, req.body.email],
                         function (error, results, fields) {
                              if (error) {
                                   return results.status(400).send({
                                        msg: err,
                                   });
                              }
                         }
                    );
                    
                    return res.json({ Status: 'Register successfully',Id:result.insertId});
               }
          });
     });
});

/*
app.post('/books', (req, res) => {
     const q = 'INSERT INTO books (`title`,`author`) VALUES (?)';

     const values = [req.body.title, req.body.author];

     db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully create');
     });
});

app.delete('/books/:idbooks', (req, res) => {
     const bookId = req.params.idbooks;

     const q = 'DELETE FROM books WHERE idbooks = ?';

     db.query(q, [bookId], (err, data) => {
          if (err) return res.json(err);
          return res.json('Successfully deleted');
     });
});
*/

app.listen(8800, () => {
     console.log('connected to backend');
});
