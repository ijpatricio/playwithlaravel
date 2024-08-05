/* eslint-disable no-restricted-globals */
import { PhpCgiWorker } from "php-cgi-wasm/PhpCgiWorker.mjs";
import {PhpWeb} from '../../../../../experiments/php-wasm/packages/php-wasm/PhpWeb.mjs'

// Log requests
const onRequest = (request, response) => {
	const url = new URL(request.url);
	const logLine = `[${(new Date).toISOString()}]`
		+ `#${php.count} 127.0.0.1 - "${request.method}`
		+ ` ${url.pathname}" - HTTP/1.1 ${response.status}`;

};

// Formatted 404s
const notFound = request => {
    if (request.url.pathname === '/') {
        return fetch(request)
    }

	return new Response(
		`<body><h1>404</h1>${request.url} not found</body>`,
		{status: 404, headers:{'Content-Type': 'text/html'}}
	);
};

const sharedLibs = [
    `./___lib/php${PhpCgiWorker.phpVersion}-dom.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-gd.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-iconv.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-intl.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-mbstring.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-openssl.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-pdo-sqlite.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-phar.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-simplexml.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-sqlite.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-tidy.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-xml.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-yaml.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-zip.so`,
    `./___lib/php${PhpCgiWorker.phpVersion}-zlib.so`,
    { url: `./___lib/libcrypto.so`, ini: false },
    { url: `./___lib/libfreetype.so`, ini: false },
    { url: `./___lib/libiconv.so`, ini: false },
    { url: `./___lib/libicudata.so`, ini: false },
    { url: `./___lib/libicui18n.so`, ini: false },
    { url: `./___lib/libicuio.so`, ini: false },
    { url: `./___lib/libicutest.so`, ini: false },
    { url: `./___lib/libicutu.so`, ini: false },
    { url: `./___lib/libicuuc.so`, ini: false },
    { url: `./___lib/libjpeg.so`, ini: false },
    { url: `./___lib/libonig.so`, ini: false },
    { url: `./___lib/libpng.so`, ini: false },
    { url: `./___lib/libsqlite3.so`, ini: false },
    { url: `./___lib/libssl.so`, ini: false },
    { url: `./___lib/libtidy.so`, ini: false },
    { url: `./___lib/libxml2.so`, ini: false },
    { url: `./___lib/libyaml.so`, ini: false },
    { url: `./___lib/libz.so`, ini: false },
    { url: `./___lib/libzip.so`, ini: false },
];

const files = [{ parent: '/preload/', name: 'icudt72l.dat', url: './___lib/icudt72l.dat' }];

// Spawn the PHP-CGI binary
const php = new PhpCgiWorker({
	onRequest,
    notFound,
    sharedLibs,
    files,
    prefix: '/',
    exclude: [
        '/___', '/lib', '/php8.3', '/icudt72l.dat', '/cgi-worker.js', '/browser-php', '/sandboxes',
    ],
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
