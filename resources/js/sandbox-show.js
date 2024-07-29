import { onMessage } from 'php-cgi-wasm/msg-bus';

navigator.serviceWorker.addEventListener('message', onMessage);
