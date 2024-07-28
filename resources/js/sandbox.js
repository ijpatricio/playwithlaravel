import { onMessage } from 'php-cgi-wasm/msg-bus';
import { PhpWeb } from 'php-wasm/PhpWeb';

console.log('Hello from sandbox.js');

// Register the service worker
navigator.serviceWorker.register(`/cgi-worker.js`);
navigator.serviceWorker.addEventListener('message', onMessage);
setTimeout(() => navigator.serviceWorker.controller || window.location.reload(), 350);

// Prepare the sandbox. Get the PHP project from the server
const sharedLibs = [
    `/libcrypto.so`,
    `/libfreetype.so`,
    `/libiconv.so`,
    { url: '/libicudata.so',        ini: false },
    { url: '/libicui18n.so',        ini: false },
    { url: '/libicuio.so',        ini: false },
    { url: '/libicutest.so',        ini: false },
    { url: '/libicutu.so',        ini: false },
    { url: '/libicuuc.so',        ini: false },
    `/libjpeg.so`,
    `/libonig.so`,
    `/libpng.so`,
    `/libsqlite3.so`,
    `/libssl.so`,
    `/libtidy.so`,
    `/libxml2.so`,
    `/libyaml.so`,
    `/libz.so`,
    `/libzip.so`,
    `/php8.3-dom.so`,
    `/php8.3-gd.so`,
    `/php8.3-iconv.so`,
    `/php8.3-intl.so`,
    `/php8.3-mbstring.so`,
    `/php8.3-openssl.so`,
    `/php8.3-pdo-sqlite.so`,
    `/php8.3-phar.so`,
    `/php8.3-simplexml.so`,
    `/php8.3-sqlite.so`,
    `/php8.3-tidy.so`,
    `/php8.3-xml.so`,
    `/php8.3-yaml.so`,
    `/php8.3-zip.so`,
    `/php8.3-zlib.so`,
    `/php${PhpWeb.phpVersion}-zip.so`,
    `/php${PhpWeb.phpVersion}-zlib.so`,
];
const php = new PhpWeb({sharedLibs, persist: [{mountPath:'/persist'}, {mountPath:'/config'}]});

(async () => {
    await php.binary;

    php.addEventListener('output', event => console.log(event.detail));
    php.addEventListener('error', event => console.log(event.detail));

    php.run(`
<?php

echo "Hello from PHP!\n";

?>
`);

})()

