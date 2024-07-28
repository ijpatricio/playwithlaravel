import { onMessage } from 'php-cgi-wasm/msg-bus';

console.log('Hello from sandbox.js');

console.log(navigator)

navigator.serviceWorker.register(`/build/assets`+`/cgi-worker.js`, {
    scope: '/',
});

navigator.serviceWorker.addEventListener('message', onMessage);

// setTimeout(() => navigator.serviceWorker.controller || window.location.reload(), 350);
