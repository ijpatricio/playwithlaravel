const o=new Map,g=e=>async(a,r=[])=>{const t=window.crypto.randomUUID();let s,n;const d=new Promise((c,i)=>[s,n]=[c,i]);return o.set(t,[s,n,a,r]),navigator.serviceWorker.getRegistration(e).then(c=>c.active.postMessage({action:a,params:r,token:t})),d},p=e=>{if(e.data.re&&o.has(e.data.re)){const[a,r,t,s]=o.get(e.data.re);o.delete(e.data.re),e.data.error?r({error:e.data.error,action:t,params:s}):a(e.data.result)}};export{p as o,g as s};