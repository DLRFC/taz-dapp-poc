if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/LTeBmUVcOp3se1fR5Sv3O/_buildManifest.js",revision:"1154990bb42ddb365f2bfe8bb5f05e72"},{url:"/_next/static/LTeBmUVcOp3se1fR5Sv3O/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/129-365ec38e169b7969.js",revision:"365ec38e169b7969"},{url:"/_next/static/chunks/143-e3686f33feabe030.js",revision:"e3686f33feabe030"},{url:"/_next/static/chunks/308-03bd149ce46972eb.js",revision:"03bd149ce46972eb"},{url:"/_next/static/chunks/327-2a4e2a89d1ab0a9a.js",revision:"2a4e2a89d1ab0a9a"},{url:"/_next/static/chunks/3d69e65b-719d89940ee1de1c.js",revision:"719d89940ee1de1c"},{url:"/_next/static/chunks/414-b8703911e6aa6fcd.js",revision:"b8703911e6aa6fcd"},{url:"/_next/static/chunks/479-c0226fb4eb375f16.js",revision:"c0226fb4eb375f16"},{url:"/_next/static/chunks/504.5e54bc6163f369ea.js",revision:"5e54bc6163f369ea"},{url:"/_next/static/chunks/574-4499e7cd1246ec0b.js",revision:"4499e7cd1246ec0b"},{url:"/_next/static/chunks/663.8213e227209a3c78.js",revision:"8213e227209a3c78"},{url:"/_next/static/chunks/664-c811699c796279eb.js",revision:"c811699c796279eb"},{url:"/_next/static/chunks/669-50e9a19b252bc84a.js",revision:"50e9a19b252bc84a"},{url:"/_next/static/chunks/732-32d3ed9824a340e8.js",revision:"32d3ed9824a340e8"},{url:"/_next/static/chunks/78e521c3-99e57aec8b85b237.js",revision:"99e57aec8b85b237"},{url:"/_next/static/chunks/898.dede6259a3ce7253.js",revision:"dede6259a3ce7253"},{url:"/_next/static/chunks/899-b663bd3814e685e0.js",revision:"b663bd3814e685e0"},{url:"/_next/static/chunks/925-0393c25375b4031c.js",revision:"0393c25375b4031c"},{url:"/_next/static/chunks/938.81b5756cfe5ef344.js",revision:"81b5756cfe5ef344"},{url:"/_next/static/chunks/957d5091-7e0e0d8f48234898.js",revision:"7e0e0d8f48234898"},{url:"/_next/static/chunks/9afd3f59-23c30b09ce7a89cc.js",revision:"23c30b09ce7a89cc"},{url:"/_next/static/chunks/a76739bd-a7080dd103ad1ea1.js",revision:"a7080dd103ad1ea1"},{url:"/_next/static/chunks/ad7f724d-ea7b966771d1a05c.js",revision:"ea7b966771d1a05c"},{url:"/_next/static/chunks/fcfa8dee.98c5c6c8d7558dff.js",revision:"98c5c6c8d7558dff"},{url:"/_next/static/chunks/fec483df-dfccfe91346693da.js",revision:"dfccfe91346693da"},{url:"/_next/static/chunks/framework-0ba0ddd33199226d.js",revision:"0ba0ddd33199226d"},{url:"/_next/static/chunks/main-c306cb62bbe26a36.js",revision:"c306cb62bbe26a36"},{url:"/_next/static/chunks/pages/_app-595442122fd75aa1.js",revision:"595442122fd75aa1"},{url:"/_next/static/chunks/pages/_error-effe22be6ff34abe.js",revision:"effe22be6ff34abe"},{url:"/_next/static/chunks/pages/answer-question-page/%5BmessageId%5D-684c0f1b30cab816.js",revision:"684c0f1b30cab816"},{url:"/_next/static/chunks/pages/answers-board-page/%5BmessageId%5D-779b4f624a2b3d69.js",revision:"779b4f624a2b3d69"},{url:"/_next/static/chunks/pages/answers/%5BmessageId%5D-948f9c5c2e898518.js",revision:"948f9c5c2e898518"},{url:"/_next/static/chunks/pages/artBoard-page-14795b778e5a3fee.js",revision:"14795b778e5a3fee"},{url:"/_next/static/chunks/pages/artGallery-page-5879c1da41c3288f.js",revision:"5879c1da41c3288f"},{url:"/_next/static/chunks/pages/ask-question-page-9bba83c40e675229.js",revision:"9bba83c40e675229"},{url:"/_next/static/chunks/pages/experiences-page-440adfe7f4cb3e39.js",revision:"440adfe7f4cb3e39"},{url:"/_next/static/chunks/pages/generate-id-page-af39f3cbdc741445.js",revision:"af39f3cbdc741445"},{url:"/_next/static/chunks/pages/generative-art-c49c5f77197e72b1.js",revision:"c49c5f77197e72b1"},{url:"/_next/static/chunks/pages/index-d64451ec14a259cb.js",revision:"d64451ec14a259cb"},{url:"/_next/static/chunks/pages/join-5b5b7cf8d30711fe.js",revision:"5b5b7cf8d30711fe"},{url:"/_next/static/chunks/pages/modal-test-94576d7c1ae36104.js",revision:"94576d7c1ae36104"},{url:"/_next/static/chunks/pages/questions-86a6e7156ac03d72.js",revision:"86a6e7156ac03d72"},{url:"/_next/static/chunks/pages/questions-page-a35dd8ff13ca0ffe.js",revision:"a35dd8ff13ca0ffe"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c477afc9f6c6f166.js",revision:"c477afc9f6c6f166"},{url:"/_next/static/css/c6d684c9aa89bbc9.css",revision:"c6d684c9aa89bbc9"},{url:"/dwg1.png",revision:"5006ca9ed839355b63494f53a789af2c"},{url:"/fill_bucket.png",revision:"a78a53c5b28b4451d050d7aee1d44b8b"},{url:"/icon-192x192.png",revision:"7a7f006bf8b924c0a4fe241fb9828310"},{url:"/icon-256x256.png",revision:"d00d84c63d9acf331d6b742416b234f7"},{url:"/icon-384x384.png",revision:"fee6e19bbb2a7b262e0974b8a405d3c5"},{url:"/icon-512x512.png",revision:"0fd99d47defe3e77446bcc385d37e136"},{url:"/manifest.json",revision:"187d7072f9b7cf085321627c32bff6ba"},{url:"/minimize.png",revision:"c21d0f58c450090b7e38f7e01e5d9add"},{url:"/pen.png",revision:"1d9e75c6311c8fda13ed59a0e1b957d5"},{url:"/semaphore.zkey",revision:"955cd320a3df0710931a4db71feda1bc"},{url:"/semaphoreWasm.wasm",revision:"225acc73d69c675254998f14f1cedb46"},{url:"/undo.png",revision:"31a15d2a0e09fcd76046304e1e4b91f3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
