import { onMessage } from 'php-cgi-wasm/msg-bus';
import { PhpWeb } from 'php-wasm/PhpWeb';
import { sendMessageFor } from 'php-cgi-wasm/msg-bus';

const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

// Register the service worker
navigator.serviceWorker.register(`/cgi-worker.js`);
navigator.serviceWorker.addEventListener('message', onMessage);
setTimeout(() => navigator.serviceWorker.controller || window.location.reload(), 350);



// Prepare the sandbox. Get the PHP project from the server
const sharedLibs = [
    `./___lib/php${PhpWeb.phpVersion}-dom.so`,
    `./___lib/php${PhpWeb.phpVersion}-gd.so`,
    `./___lib/php${PhpWeb.phpVersion}-iconv.so`,
    `./___lib/php${PhpWeb.phpVersion}-intl.so`,
    `./___lib/php${PhpWeb.phpVersion}-mbstring.so`,
    `./___lib/php${PhpWeb.phpVersion}-openssl.so`,
    `./___lib/php${PhpWeb.phpVersion}-pdo-sqlite.so`,
    `./___lib/php${PhpWeb.phpVersion}-phar.so`,
    `./___lib/php${PhpWeb.phpVersion}-simplexml.so`,
    `./___lib/php${PhpWeb.phpVersion}-sqlite.so`,
    `./___lib/php${PhpWeb.phpVersion}-tidy.so`,
    `./___lib/php${PhpWeb.phpVersion}-xml.so`,
    `./___lib/php${PhpWeb.phpVersion}-yaml.so`,
    `./___lib/php${PhpWeb.phpVersion}-zip.so`,
    `./___lib/php${PhpWeb.phpVersion}-zlib.so`,
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

const php = new PhpWeb({
    sharedLibs,
    files,
    persist: [
        {mountPath:'/persist'},
        {mountPath:'/config'}
    ],
});

(async () => {
    await php.binary;

    php.addEventListener('output', event => console.log(event.detail));
    php.addEventListener('error', event => console.log(event.detail));

    window.dispatchEvent(new CustomEvent('install-status', {detail: 'Acquiring Lock...'}));
    console.log('Acquiring Lock...')

    // const downloader = fetch(`/sandboxes/laravel-11.zip`);
    const downloader = fetch(`/sandboxes/first-sandbox.zip`);
    // const downloader = fetch(`/sandboxes/filament-demo.zip`);
    const initPhpCode = await (await fetch('/browser-php/init.xphp')).text();

    const sandboxUlid = PWL.sandboxUlid;

    await navigator.locks.request('php-wasm-demo-install', async () => {

        const checkPath = await sendMessage('analyzePath', ['/persist/' + sandboxUlid]);

        if(checkPath.exists)
        {
            console.log('Sandbox already exists!');

            window.demoInstalling = null;
            window.location = '/'
            if(window.opener)
            {
                window.opener.dispatchEvent(
                    new CustomEvent('install-complete', { detail: sandboxUlid })
                );
            }
            return;
        }
        console.log('Sandbox does not exist!');

        window.dispatchEvent(new CustomEvent('install-status', {detail: 'Downloading package...'}));
        console.log('Downloading package...')

        const download = await downloader;
        const zipContents = await download.arrayBuffer();

        const settings = await sendMessage('getSettings');

        const vHostPrefix = '/'
        const existingvHost = settings.vHosts.find(vHost => vHost.pathPrefix === vHostPrefix);

        if(! existingvHost)
        {
            settings.vHosts.push({
                pathPrefix: '/',
                directory:  '/persist/' + sandboxUlid + `/public`,
                entrypoint: `index.php`
            })
        }
        else
        {
            existingvHost.directory = '/persist/' + sandboxUlid + `/public`
            existingvHost.entrypoint = `index.php`
        }

        await sendMessage('setSettings', [settings]);
        await sendMessage('storeInit');

        window.dispatchEvent(new CustomEvent('install-status', {detail: 'Unpacking files...'}));
        console.log('Unpacking files...')

        await sendMessage('writeFile', ['/persist/restore.zip', new Uint8Array(zipContents)]);
        await sendMessage('writeFile', ['/config/restore-path.tmp', '/persist/' + sandboxUlid]);

        console.log(await php.run(initPhpCode));

        window.dispatchEvent(new CustomEvent('install-status', {detail: 'Refreshing PHP...'}));
        console.log('Refreshing PHP...')

        await sendMessage('refresh', []);

        window.dispatchEvent(new CustomEvent('install-status', {detail: 'Opening site...'}));
        console.log('Opening site...')

        if(window.opener)
        {
            window.opener.dispatchEvent(new CustomEvent('install-complete', {detail: sandboxUlid}));
        }

        window.location = '/';
    })


    php.run(`
<?php

echo "Hello from PHP!\n";

?>
`);

})()

