// sw.js — host this at https://YOUR-SERVER/sw.js
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).then((response) => {
            const ct = response.headers.get('content-type') || '';
            if (!ct.includes('text/html')) return response;
            
            return response.text().then((html) => {
                const banner = `
<div id="scam-banner" style="
    position:fixed;top:0;left:0;right:0;z-index:2147483647;
    background:#cc0000;color:#fff;padding:14px;text-align:center;
    font-family:Arial,sans-serif;font-size:15px;font-weight:bold;
    box-shadow:0 4px 20px rgba(0,0,0,0.6);line-height:1.5;
    animation:pulse 2s infinite;
">
    ⚠️ SCAM — paygomond.vercel.app IS A PONZI SCHEME ⚠️
    &nbsp;|&nbsp; Fake balances. No withdrawals. Bank details harvested.
    &nbsp;|&nbsp; PAY ID: PG-7474PAYDDT1I2P18837DOEFQ
    &nbsp;|&nbsp; Report: efcc.gov.ng
</div>
<style>
    body{padding-top:70px!important}
    @keyframes pulse{0%,100%{background:#cc0000}50%{background:#ff0000}}
</style>`;
                
                return new Response(html.replace(/<body[^>]*>/, '$&' + banner), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            });
        })
    );
});
