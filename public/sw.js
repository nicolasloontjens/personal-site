"use strict";

const CACHE_NAME = "cache-v1.01";

const CACHED_URLS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/assets/js/script.js",
    "/assets/css/reset.css",
    "/assets/css/style.css",
    "/assets/css/style.css.map",
    "/assets/css/style.scss",
    "/assets/data/work.json",
    "/assets/fonts/SF-Pro-Text-Regular.otf",
    "/assets/images/arr_white_back.png",
    "/assets/images/arr_white_forward.png",
    "/assets/images/favicon.png"
]

self.addEventListener("install",function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHED_URLS)
        })
    )
})

self.addEventListener("fetch",function(e){
    e.respondWith(caches.open(CACHE_NAME).then(cache =>{
        return cache.match(e.request).then(cacheResponse => {
            return cacheResponse || fetch(e.request);
        });
    }))
})