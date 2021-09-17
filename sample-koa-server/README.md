# skKoaJsPM2
Working with Koa and PM2

# Install PM2
npm install pm2 -g

 Production Process Manager for Node.js applications with a built-in Load Balancer.

	Start and Daemonize any application:
	$ pm2 start app.js

	Start and Daemonize any application with configuration file:
	$ pm2 start process.yml

	Load Balance 4 instances of api.js:
	$ pm2 start api.js -i 4

	Monitor in production:
	$ pm2 monitor

	Make pm2 auto-boot at server restart:
	$ pm2 startup


    Start an app using all CPUs available + set a name :
    $ pm2 start app.js -i 0 --name "api"

    Restart the previous app launched, by name :
    $ pm2 restart api

    Stop the app :
    $ pm2 stop api

    Restart the app that is stopped :
    $ pm2 restart api

    Remove the app from the process list :
    $ pm2 delete api

    Kill daemon pm2 :
    $ pm2 kill

    Update pm2 :
    $ npm install pm2@latest -g ; pm2 update

Restarting PM2 with the processes you manage on server boot/reboot is critical. To solve this, just run this command to generate an active startup script:

pm2 startup

# monitor
pm2 monitor

Now registering to Keymetrics
Username: syadav214
Email:
Email: emailID
Password: *********

Creating account on Keymetrics..........................[KM] Connecting
[Monitoring Enabled] Dashboard access: https://app.keymetrics.io/#/r/1s5y3t3gu8sx7di
