//check whether browser support service workers
if ('serviceWorker' in navigator) {
    //wait until page loaded to avoid delaying rendering
    window.addEventListener('load', function() {
        //register service worker
        navigator.serviceWorker.register('serviceworker.js').then(
            function(registration) {
                console.log('Service worker registration successful', 
                             registration);
            }, 
            function(err) {
                console.log('Service worker registration failed', err);
        });
    });
}
const CACHE_NAME = 'ben-haig-cv';
const CACHE_URLS = ['/',
                    'index.html',
                    'qualification.html',
                    'skills.html',
                    'Design1.html',
                    'Design2.html',
                    'ECMAscript.html',
                    'style.css',
                    'Design1.css',
                    'Design2.css',
                    'script.js',
                    '/pics/staffsuni.jpg',
                    '/pics/tabletennis.jpg',
                    '/pics/staffs.png',
                    '/pics/codepic.jpg',
                    '/pics/des1.JPG',
                    '/pics/des2.JPG',
                    '/pics/coffeescript.JPG',
                    '/pics/codepicture.jpg',
                    '/pics/pythonlogo.png',
                    '/pics/csharp.png',
                    '/pics/uml.png',
                    '/pics/icons/android-chrome-192x192.png',
                    '/pics/icons/android-chrome-384x384.png',
                    '/pics/icons/apple-touch-icon.png',
                    '/pics/icons/browserconfig.xml',
                    '/pics/icons/favicon.ico',
                    '/pics/icons/favicon-16x16.png',
                    '/pics/icons/favicon-32x32.png',
                    '/pics/icons/mstile-150x150.png',
                    '/pics/icons/safari-pinned-tab.svg',
                    '/pics/icons/site.webmanifest'];

// Wait until we have been notified that we are installed
self.addEventListener("install", function(event){
    
    // Announce that we are installed
    console.log("Service worker installed", self);
    
    // Create a cache, and add the resources to the cache
   // Tell the "install" event to wait for the promises to resolve before it completes
    event.waitUntil(
    
        caches.open(CACHE_NAME).then(function(cache){
            // Cache has been opened
            console.log("Cache opened: ", cache);
                
            // Now add all URLs to the cache
            return cache.addAll(CACHE_URLS);
        })
    );
});
//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.endsWith('appshell') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
