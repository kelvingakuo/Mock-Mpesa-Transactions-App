<h1>MOCK MPESA TRANSACTIONS APP</h1>

<p>An app built to consume the Transactions REST API documented here: bit.ly/gakuoapidoc</p>

<h2>Overview:</h2>
<ul>
	<li>
		Frontend
		An implementation of a web app consuming the REST API.
		The app is built using:
		<ul>
			<li>AngularJS 1.5 - Views</li>
			<li>ExpressJS - Routing</li>
		</ul>

	</li>
	<li>
		Backend
		And implementation of the API.
		The API is built using:
		<ul>
			<li>MongoDB - Persistence of data</li>
			<li>ExpressJS - Routing</li>
	</li>
</ul>


<h2>Installation</h2>
<ul>
	<li>Frontend
		<code>cd Frontend/</code>
		<code>npm install</code>
		<code> nodemon start</code>
	</li>

	<li>Backend
		<code>cd Backend/</code>
		<code>npm install</code>
		<code>nodemon start</code>
	</li>
</ul>


<h2>Directory structure</h2>
<ul>
	<li>Frontend
		<ul>
			<li>package.json - App description, dependencies etc</li>
			<li>/router.js - The entry point</li>
			<li>/package-lock.json - Comprehensive list of dependencies</li>
			<li>/views - HTML files served by router.js</li>
			<li>/public - Assets e.g JS files</li>
		</ul>
	</li>

	<li>Backend
		<ul>
			<li>package.json - App description, dependencies etc</li>
			<li>/server.js - The entry point</li>
			<li>/package-lock.json - Comprehensive list of dependencies</li>
		</ul>
	</li>
</ul>


<h2>Usage</h2>
Both the frontend and backend are on Heroku.

The app can be accesed via: http://bit.ly/gakuowebapp




