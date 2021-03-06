import dotenv from 'dotenv';
import express from 'express';
import greeting from './greeting';
import contactsRouter from './api/contacts';
import postsRouter from './api/posts/';

import bodyParser from 'body-parser';


import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenicate'
//import authenticate from './authenticate';

import './db';
import passport from './auth';



dotenv.config();

//const app = express();
export const app = express();



//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

const port = process.env.PORT;

app.use(express.static('public'));



app.use(passport.initialize());

// add route for /greeting
app.get('/greeting', (req, res)=>{
  let lang = req.headers['accept-language'];
  const defaultLang='en';
  if (!greeting[lang]) lang=defaultLang;
  const response={
    lang: lang,
    message: greeting[lang],
  };

  res.writeHead(200, {'Content-Type': 'text/plain',
                      'Content-Language': response.lang});
  res.end(response.message);
});

app.use('/api/contacts', contactsRouter);

//app.use('/api/posts', authenticate,postsRouter);

app.use('/api/posts', passport.authenticate('jwt', {session: false}), postsRouter);
//User router
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});






