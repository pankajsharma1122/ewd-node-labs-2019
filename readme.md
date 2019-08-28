# Assignment 2 - ReactJS App & API.

Name: ... pankaj Sharma...

## Overview.
...... A statement of the app concept and objectives (just a few lines) ........


 . . . . . List of user features (excluding user registration and authentication) . . . . 
 
 + Login
 + Add Posts
 + Add COmments to a post
 + Upvote Posts
 + etc
 + List Multiple posts with time order 
  + upvote a comment

## Installation requirements.
	1. Install Node Js from https://nodejs.org/en/download/
	2. Install Git
	3. Install Mongo Db community Eddition
	4. Git clone https://github.com/pankajsharma1122/ewd-node-labs-2019.git
	5. RUN npm install in node_lab1 folder
	6. Run npm install in hackeNews Folder
	7. Run npm start in node_lab1
	8. Run npm start in hackeNews


## Data Model Design.
MONGO DB Collections
1.Post Collection sto store all the posts. Object in post collection will also conatain comments
2. contact collection will contain credentials of all users .	
  

## App Component Design.

1.NewsList : Displays the list of user posts
2.LoginPage : assist user to login
3.NewsItem : Container for displaying a single post.



## UI Design.

Screen shots attached.
1. hackerNews Home
2. hackerNews LoginPage
3.hackerNews Comment

![][image3]

## Routing.
. . . . List each route supported and state the associated view . . . . . 

+ /login - displays login page.
+ / - Home page which Display Post for a logged in roles. 
+ /posts/:post_id - Display Form to add a comment for a post
+ 

Specify which, if any, of the above routes are protected (require login)

# Web API Endpoint Reference
. . . Give a brief overview of the Web API functionality.

## Web API Install and Operation
. . . . Describe how to install/start/stop the API. It would be a good idea to go though the scripts section of the package.json file.

## API Design
Describe your web API.

| HTTP Verb & Path |  Description |
| -- | -- |
| **GET**  /api/posts |return a list of POSTS |
| **POST** /api/posts |add a new POST |
| **POST** /api/posts/:postId/upvotes |Upvote POST |
| **POST** /api/posts/:postId/comments |Add a comment |
| **POST** /api/posts/:postId/comments/:commentId/upvotes |Upvote a comment |
| **POST** /api/users |Authenticate a USER |
{
    "username": "dsdsd",
    "password": "zzzzz"
}
| **PUT** /posts/api/contacts/{id} | update a contact |
| **DELETE** /api/posts/:postId/comments/:commentId | delete a comment |

## API Configuration
Create a .env file at the root of node_lab1 folder :
~~~bash
NODE_ENV=development
PORT=8080
HOST=host eg <localhost>

mongoDB=mongodb://host:post/contacts_db
seedDb=true

secret=<Place Your secret Key>

~~~

## Security and Authentication
. . . . Give details of any autentication/security implemented in on the API. Indicate which routes are protected.

All Post realted APIs are required to have a authenticated JWT token to be passed in HTTP header in Authorization property. Initial token is generated at the time of login and is cached on 
local storeage in hackerNews application. In subsequent user session , same token is used to access end points. 

## Testing
Unit test has been accomplished  

## Extra features

## Independent learning.
.  



[model]: ./data.jpg
[image3]: ./hackerNews xxxx.png
[stories]: ./storybook.png
[image4]: ./testing.png