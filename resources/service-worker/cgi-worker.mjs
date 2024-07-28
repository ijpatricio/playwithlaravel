/* eslint-disable no-restricted-globals */
import { PhpCgiWorker } from "php-cgi-wasm/PhpCgiWorker.mjs";

// Log requests
const onRequest = (request, response) => {

    debugger

	const url = new URL(request.url);
	const logLine = `[${(new Date).toISOString()}]`
		+ `#${php.count} 127.0.0.1 - "${request.method}`
		+ ` ${url.pathname}" - HTTP/1.1 ${response.status}`;

	console.log(logLine);
};

// Formatted 404s
const notFound = request => {
	return new Response(
		`<body><h1>404</h1>${request.url} not found</body>`,
		{status: 404, headers:{'Content-Type': 'text/html'}}
	);
};

const sharedLibs = [
	`php\${PHP_VERSION}-zlib.so`,
	`php\${PHP_VERSION}-zip.so`,
	`php\${PHP_VERSION}-gd.so`,
	`php\${PHP_VERSION}-iconv.so`,
	`php\${PHP_VERSION}-intl.so`,
	`php\${PHP_VERSION}-openssl.so`,
	`php\${PHP_VERSION}-dom.so`,
	`php\${PHP_VERSION}-mbstring.so`,
	`php\${PHP_VERSION}-sqlite.so`,
	`php\${PHP_VERSION}-pdo-sqlite.so`,
	`php\${PHP_VERSION}-xml.so`,
	`php\${PHP_VERSION}-simplexml.so`,
];

const files = [{ parent: '/preload/', name: 'icudt72l.dat', url: './icudt72l.dat' }];

// Spawn the PHP-CGI binary
const php = new PhpCgiWorker({
	onRequest,
    notFound,
    sharedLibs,
    files,
    prefix: '/php-wasm/cgi-bin/',
    docroot: '/persist/www',
    types: {
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        gif: 'image/gif',
        png: 'image/png',
        svg: 'image/svg+xml',
        js: 'application/javascript'
	}
});

// Set up the event handlers
self.addEventListener('install',  event => php.handleInstallEvent(event));
self.addEventListener('activate', event => php.handleActivateEvent(event));
self.addEventListener('fetch',    event => {
    console.log('Fetch', event.request.url)
    php.handleFetchEvent(event)
});
self.addEventListener('message',  event => php.handleMessageEvent(event));

// Extras
self.addEventListener('install',  event => console.log('Install'));
self.addEventListener('activate', event => console.log('Activate'));
