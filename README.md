<h1>MOCK MPESA TRANSACTIONS APP</h1>

<p>An app built to consume the Transactions REST API documented here: <a href="http://bit.ly/gakuoapidoc">http://bit.ly/gakuoapidoc</a></p>

<h2>Overview:</h2>
<ul>
	
		1. Frontend<br> 
		An implementation of a web app consuming the REST API.<br>
		The app is built using:<br>
		<ul>
			<li>AngularJS 1.5 - Views</li>
			<li>ExpressJS - Routing</li>
		</ul>
	
	
		2. Backend<br>
		And implementation of the API.<br>
		The API is built using:
		<ul>
			<li>MongoDB - Persistence of data</li>
			<li>ExpressJS - Routing</li>
		</ul>
	
</ul>


<h2>Installation</h2>
<ul>
	1. Frontend
		<code>cd Frontend/</code><br>
		<code>npm install</code><br>
		<code> nodemon start</code><br>
	

	2. Backend<br>
		<code>cd Backend/</code><br>
		<code>npm install</code><br>
		<code>nodemon start</code><br>
</ul>


<h2>Directory structure</h2>
<ul>
	1. Frontend<br>
		<ul>
			<li>package.json - App description, dependencies etc</li>
			<li>/router.js - The entry point</li>
			<li>/package-lock.json - Comprehensive list of dependencies</li>
			<li>/views - HTML files served by router.js</li>
			<li>/public - Assets e.g JS files</li>
		</ul>
	

	2. Backend<br>
		<ul>
			<li>package.json - App description, dependencies etc</li>
			<li>/server.js - The entry point</li>
			<li>/package-lock.json - Comprehensive list of dependencies</li>
		</ul>
	
</ul>


<h2>Usage</h2>
Both the frontend and backend are on Heroku.

The app can be accesed via: http://bit.ly/gakuowebapp




