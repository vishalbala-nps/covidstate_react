if ('function' === typeof importScripts) {
    importScripts(
      'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
    );
    /* global workbox */
    if (workbox) {
      workbox.skipWaiting()
      console.log('Workbox is loaded');
  
      /* injection point for manifest files.  */
      workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  
      /* custom cache rules*/
      workbox.routing.registerNavigationRoute('/index.html', {
        blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/,/^\/api/],
     });
     
     workbox.routing.registerRoute(
        new RegExp("https:\/\/covidstate\.in\/api\/v1\/messages*"),
        new workbox.strategies.CacheFirst(),
        "GET"
     )
     workbox.routing.registerRoute(
        new RegExp("https:\/\/covidstate\.in\/api\/v1\/contacts*"),
        new workbox.strategies.NetworkFirst(),
        "GET"
     )
     workbox.routing.registerRoute(
        new RegExp("https:\/\/covidstate\.in\/api\/v1\/faqs*"),
        new workbox.strategies.CacheFirst(),
        "GET"
     )

  } else {
      console.log('Workbox could not be loaded. No Offline support');
    }
  }