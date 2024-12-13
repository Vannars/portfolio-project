# portfolio-project
Portfolio project for Databases and the Web (Year 3)

To get started with GoldGameReviews you need to setup the environment.

STEP 1: On your local environment go to the terminal and npm install : 

npm install node.js
npm install mysql2
npm install ejs
npm install bcrypt
npm install dotenv
npm install express
npm install express-session
npm install express-sanitizer
npm install express-validator
npm install curl

STEP 2: 
You also need to set up the database in MySQL workbench:
Find the db_models directory and execute the following in the workbench

source create_db.sql
source insert_into_db.sql


If you don't have msql workbench in the terminal in the project directory use:
cd db_models
sudo mysql
source create_db.sql
source insert_into_db.sql

(these are required just in case the idgb database isnt working - you can still query the database for information)

(or the path to the project specific to your machine)

STEP 3: You have setup the database to run on port 8000 so make sure this is free.

Go to your ide and run using:

node index.js

Then go to your chosen browser and goto:

http://localhost:8000/

STEP 4: From the main page go to register and enter your details.
After, take note of you details as displayed on the top of the screen (for testing purposes rather than security)

STEP 5: Test the search - for a game
STEP 6  Create a review
STEP 7: Click on a review
STEP 8: Go to the home page 
STEP 9: Browse the other pages (including search for a review by game)
STEP 10: Test logout 

=====================================DATABASE LOGIN===================================
In an emegengy here are the database and api keys:

DB_HOST=localhost
DB_USER=goldgamer
DB_PASSWORD=password
DB_NAME=gamereviews_db
===============TWITCH API==============================================
These can be used to generate a new secret key if the access token does not work.
TWITCH_CLIENT_ID=9hvwkjvg11ocdmuhm08bxj7e37w5et
TWITCH_CLIENT_SECRET=axei3vf9cfj4aik9r4860syq5sqrz9
ACCESS_TOKEN=hgr9d70kdfsg0vcfv0giwush5xr49l


===================MY PROVIDED API API.JS===================================================
The following commands can be used when running on a localhost:

node.For accessing all the REVIEWS data - 
curl.exe -X GET http://localhost:8000/api/reviews

For accessing review data by id (the number at the end) -
curl.exe -X GET http://localhost:8000/api/reviews/1

For deleting review data by id –
curl.exe -X DELETE http://localhost:8000/api/reviews/1

For accessing all the USERS data - 
curl.exe -X GET http://localhost:8000/api/users

For accessing user data by id (the number at the end) -
curl.exe -X GET http://localhost:8000/api/users/1

For deleting user data by id –
curl.exe -X DELETE http://localhost:8000/api/users/1

FIN 