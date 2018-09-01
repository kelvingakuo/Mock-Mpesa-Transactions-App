MOCK MPESA TRANSACTIONS APP
===========================

An app built to consume the Transactions REST API documented here: [http://bit.ly/gakuoapidoc](http://bit.ly/gakuoapidoc)

Overview
---------

*   Frontend  
    An implementation of a web app consuming the REST API.  
    The app is built using:  
    *   [AngularJS 1.5](https://angularjs.org/) - UI/UX
    *   [ExpressJS](https://expressjs.com/) - Routing
*   Backend  
    And implementation of the API.  
    The API is built using:
    *   [MongoDB](https://www.mongodb.com/) - Persistence of data
    *   [ExpressJS](https://expressjs.com/) - Routing

Prerequisites
------------
Both the fronted and backend need NPM and Node, at the bare minimum
* Install [NodeJS](https://nodejs.org/en/)
  This installation should come packaged with NPM. Confirm:
```
  node -v
  npm -v
```
* Install nodemon
  A nifty package that restarts the server at every file change
```
  npm install -g nodemon --save
```

Installation
------------

*   Frontend  
```
    cd Frontend/  
    npm install  
    nodemon start
```
*   Backend  
```
    cd Backend/  
    npm install  
    nodemon start
```

Directory structure
-------------------

*   Frontend  
    *   package.json - App description, dependencies etc
    *   /router.js - The entry point
    *   /package-lock.json - Comprehensive list of dependencies
    *   /views - HTML files served by router.js
    *   /public - Assets e.g JS files
*   Backend  
    *   package.json - App description, dependencies etc
    *   /server.js - The entry point
    *   /package-lock.json - Comprehensive list of dependencies

Usage
-----

Both the frontend and backend are on [Heroku](https://www.heroku.com/). The app can be accesed via:[http://bit.ly/gakuowebapp](http://bit.ly/gakuowebapp)
