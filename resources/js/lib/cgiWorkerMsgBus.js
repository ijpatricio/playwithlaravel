import { sendMessageFor } from 'php-cgi-wasm/msg-bus'

const sendMessageForCgiWorker = sendMessageFor(
    `${window.location.origin}/cgi-worker.mjs`
)

export default sendMessageForCgiWorker
