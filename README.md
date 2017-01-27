## PROJECT: Node Translator

## Requirements: ##

## Download packages ##
1. Run *npm install express --save* to install express.

2. Install config module. Run *npm install config* to organize configurations.

3. Install request module. Run *npm install request* to follow redirects.

4. Install mocha module for testing simply run *npm install --save-dev mocha*

5. Install supertest module for testing http. Run *npm install --save-dev supertest*

6. Install should to unit test it accurately. Run *npm install should --save-dev*

7. Run *npm install mongodb --save* to use as our database.

	To start MongoDB on your unit. You need to setup MongoDB v3.4.1. Please see references below.
	https://www.mongodb.com/download-center#community
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

## To run the application.

1. Run *mongo.exe* and *mongod.exe* or follow steps from the docu below on how to configure MongoDB service.
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

2. Using git bash or cmd. Run *node server.js*. The app can accessed at http://127.0.0.1:3000/trans

3. The return value will be displayed in a console or git bash.

4. You can set up the database in the config folder > default.json.

## Testing ##

1. Start mongodb database

2. Using git bash, run *mocha*





