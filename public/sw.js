if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),d={module:{uri:t},exports:i,require:r};s[t]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/19-b5b17f30bc14c3c7.js",revision:"b5b17f30bc14c3c7"},{url:"/_next/static/chunks/253.cebfb8d0bfd0b7b4.js",revision:"cebfb8d0bfd0b7b4"},{url:"/_next/static/chunks/298-8351813f70723327.js",revision:"8351813f70723327"},{url:"/_next/static/chunks/337.88b760d6afada7b9.js",revision:"88b760d6afada7b9"},{url:"/_next/static/chunks/3d69e65b-95fdcdaf3c733fa0.js",revision:"95fdcdaf3c733fa0"},{url:"/_next/static/chunks/401.b2d01726eb36526d.js",revision:"b2d01726eb36526d"},{url:"/_next/static/chunks/430-c6898edd5f6a580f.js",revision:"c6898edd5f6a580f"},{url:"/_next/static/chunks/611-ee645e94014dff66.js",revision:"ee645e94014dff66"},{url:"/_next/static/chunks/664-fe1f0ac1dd157bd4.js",revision:"fe1f0ac1dd157bd4"},{url:"/_next/static/chunks/669-1e3cb34bad8ae667.js",revision:"1e3cb34bad8ae667"},{url:"/_next/static/chunks/719-ce4563abdf1d3639.js",revision:"ce4563abdf1d3639"},{url:"/_next/static/chunks/898.381278374636c369.js",revision:"381278374636c369"},{url:"/_next/static/chunks/957d5091-0728a56d191f7074.js",revision:"0728a56d191f7074"},{url:"/_next/static/chunks/9afd3f59-bbbcbd116633920d.js",revision:"bbbcbd116633920d"},{url:"/_next/static/chunks/d9fcd7e1-366d490bd87e3824.js",revision:"366d490bd87e3824"},{url:"/_next/static/chunks/fcfa8dee.9aa2c66f1f18ef18.js",revision:"9aa2c66f1f18ef18"},{url:"/_next/static/chunks/fec483df-c836053fba500311.js",revision:"c836053fba500311"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-6c884fd140def4f4.js",revision:"6c884fd140def4f4"},{url:"/_next/static/chunks/pages/_app-d2bfd5e9f9f11b1e.js",revision:"d2bfd5e9f9f11b1e"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/answer-question-page/%5BmessageId%5D-4027ab6453e3fb28.js",revision:"4027ab6453e3fb28"},{url:"/_next/static/chunks/pages/answers-board-page/%5BmessageId%5D-883d3b65f175eb72.js",revision:"883d3b65f175eb72"},{url:"/_next/static/chunks/pages/artBoard-page-a2d93463ce8b5eaa.js",revision:"a2d93463ce8b5eaa"},{url:"/_next/static/chunks/pages/artGallery-page-e3352585702d8a0d.js",revision:"e3352585702d8a0d"},{url:"/_next/static/chunks/pages/ask-question-page-9557af1cc1c38ac9.js",revision:"9557af1cc1c38ac9"},{url:"/_next/static/chunks/pages/experiences-page-f6b962e13ac798af.js",revision:"f6b962e13ac798af"},{url:"/_next/static/chunks/pages/generate-id-page-8a6564d4e3936400.js",revision:"8a6564d4e3936400"},{url:"/_next/static/chunks/pages/generative-art-c63aabb1ec344b6a.js",revision:"c63aabb1ec344b6a"},{url:"/_next/static/chunks/pages/index-b65619d7514de5d6.js",revision:"b65619d7514de5d6"},{url:"/_next/static/chunks/pages/modal-test-72236034a531edcc.js",revision:"72236034a531edcc"},{url:"/_next/static/chunks/pages/questions-page-bf8c36b32faaf61b.js",revision:"bf8c36b32faaf61b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-09945868f24caa59.js",revision:"09945868f24caa59"},{url:"/_next/static/css/6f3cf625c72e775f.css",revision:"6f3cf625c72e775f"},{url:"/_next/static/uj0lwCJefBGnvKs5O2s3Q/_buildManifest.js",revision:"d7002090bee0581063a4743ad2ef8b44"},{url:"/_next/static/uj0lwCJefBGnvKs5O2s3Q/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/dwg1.png",revision:"5006ca9ed839355b63494f53a789af2c"},{url:"/icon-192x192.png",revision:"7a7f006bf8b924c0a4fe241fb9828310"},{url:"/icon-256x256.png",revision:"d00d84c63d9acf331d6b742416b234f7"},{url:"/icon-384x384.png",revision:"fee6e19bbb2a7b262e0974b8a405d3c5"},{url:"/icon-512x512.png",revision:"0fd99d47defe3e77446bcc385d37e136"},{url:"/manifest.json",revision:"8a5109773f08336e4ba2b969eb96ec53"},{url:"/semaphore.wasm",revision:"225acc73d69c675254998f14f1cedb46"},{url:"/semaphore.zkey",revision:"955cd320a3df0710931a4db71feda1bc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
