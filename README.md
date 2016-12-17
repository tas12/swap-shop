# Swap Shop

A single page progressive web app using service worker and WebRTC. Still under development.

## Why
1. To practice my tech skills and try out Riot.js
2. To help young people who want to become more concious consumers

## Stack

+ Node
+ Riot + Riot Material UI
+ Handlebars
+ Postgres

## Installation

`git clone https://github.com/tas12/swap-shop.git && cd swap-shop`

`npm i`

`npm run build`

Create a config.env file in the root directory and add:
```
DB_HOST=localhost
DB_USER=[your database username]
DB_NAME=[your database name]
```

`postgres -D /usr/local/var/postgres`

`npm start`

## Installation on mobile device

Make sure you have the server running. Then you can add this app to your android device. Just follow the instructions [here](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)! After that, add to your homescreen to get a full screen app.


## Wireframes

![](wireframes/wireframes-1.png)
![](wireframes/wireframes-2.png)
![](wireframes/wireframes-3.png)
![](wireframes/wireframes-4.png)

## Resources

https://pwa.rocks

https://developers.google.com/web/progressive-web-apps/

https://www.udacity.com/course/offline-web-applications--ud899

https://addyosmani.com/blog/getting-started-with-progressive-web-apps/

https://www.theguardian.com/info/developer-blog/2015/nov/04/building-an-offline-page-for-theguardiancom

https://cloudfour.com/thinks/designing-responsive-progressive-web-apps/

