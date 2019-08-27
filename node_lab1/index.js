import dotenv from 'dotenv';
import express from 'express';
import greeting from './greeting';
import contactsRouter from './api/contacts';
import postsRouter from './api/posts/';

import bodyParser from 'body-parser';
import loadContacts from './contactsData';
import {loadPosts} from './postsData';

import './db'



dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.static('public'));
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

app.use('/api/posts', postsRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

if (process.env.seedDb) {
  loadContacts();
}

// Populate DB with sample data
if (process.env.seedDb) {
  loadContacts();
  loadPosts();
}