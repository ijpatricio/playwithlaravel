const t=new Map,g=a=>async(e,n=[])=>{const r=window.crypto.randomUUID();let o,c;const d=new Promise((s,i)=>[o,c]=[s,i]);return t.set(r,[o,c]),navigator.serviceWorker.getRegistration(a).then(s=>s.active.postMessage({action:e,params:n,token:r})),d},l=a=>{if(a.data.re&&t.has(a.data.re)){const e=t.get(a.data.re);t.delete(a.data.re),a.data.error?e[1](a.data.error):e[0](a.data.result)}};export{l as o,g as s};