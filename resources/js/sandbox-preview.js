import { onMessage } from 'php-cgi-wasm/msg-bus';
import { PhpWeb } from 'php-wasm/PhpWeb';
import { sendMessageFor } from 'php-cgi-wasm/msg-bus';

const sendMessage = sendMessageFor((`${window.location.origin}/cgi-worker.mjs`))

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
    { url: '/libicudata.so', ini: false },
    { url: '/libicui18n.so', ini: false },
    { url: '/libicuio.so', ini: false },
    { url: '/libicutest.so', ini: false },
    { url: '/libicutu.so', ini: false },
    { url: '/libicuuc.so', ini: false },
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

    window.dispatchEvent(new CustomEvent('install-status', {detail: 'Acquiring Lock...'}));
    console.log('Acquiring Lock...')

    const downloader = fetch(`/sandboxes/laravel-11.zip`);
    const initPhpCode = await (await fetch('/browser-php/init.xphp')).text();

    const sandboxUlid = PWL.sandboxUlid;

    await navigator.locks.request('php-wasm-demo-install', async () => {

        const checkPath = await sendMessage('analyzePath', ['/persist/' + sandboxUlid]);

        if(checkPath.exists)
        {
            console.log('Sandbox already exists!');

            window.demoInstalling = null;
            window.location = '/php-wasm/cgi-bin/' + sandboxUlid;
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

        const vHostPrefix = '/php-wasm/cgi-bin/' + sandboxUlid;
        const existingvHost = settings.vHosts.find(vHost => vHost.pathPrefix === vHostPrefix);

        if(! existingvHost)
        {
            settings.vHosts.push({
                pathPrefix: vHostPrefix,
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

        window.location = vHostPrefix;
    })


    php.run(`
<?php

echo "Hello from PHP!\n";

?>
`);

})()

