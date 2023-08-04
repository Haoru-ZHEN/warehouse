//npm i nodemailer
import nodemailer from 'nodemailer';
//const nodemailer = require("nodemailer")

export default async (email, subject, text) => {
     try {
          const transporter = nodemailer.createTransport({
               host: 'smtp.gmail.com',
               service: 'gmail',
               post: 587,
               secure: true,
               auth: {
                    user: ,
                    pass: ,
               },
          });
          //console.log(process.env.REACT_APP_USER);

          //console.log(process.env.REACT_APP_EMAIL_PORT);

          await transporter.sendMail({
               from: process.env.REACT_APP_USER,
               to: email,
               subject: subject,
               text: text,
          });

          console.log('Email sent successfully');
     } catch (e) {
          console.log('Email sent failed');
          console.log(e);
     }
};
