import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;


/* SW NOTIF */
import webpush from 'web-push';

const vapidKeys = {
    publicKey: 'BDMG-ztoyDGOTQa_6xHwgsYIb_6GYERWKAoh8mBxUvlubZJYW9bss86QFsaEjMb6b8p4JTf0RUjOWjFrfFan0K8',
    privateKey: 'ZB2bC4UQJ7oq-bYIt4PC4Jpg82RNhAwsL69tBQP9LQE'
};
// get client subscription config from db
const subscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/c0xBceZWNTY:APA91bFghyC9TDaXK_n_JM3lEHJn-nlnTRY5nF4DkNESOd-47tU4kDC0MaiZi9YI42DoFW7f5_eDvYRIpsNyHbiaoK52VQ858ghPZ6WHQaYHictZaB1kbJasnxVJ2DE-hGMpZXQXROaL',
    expirationTime: null,
    keys: {
        auth: 'PTdtHFrcxU7Q-Fyx74ia-Q',
        p256dh: 'BOGUvAhqcROeaN1FCXVd1E-y3aE01eA-08xk0aypYOH3zvfFi2Dc4Kro7dSafauDFlrYxlQYKlr5d76TP24mF_Y',
    },
};

const payload = {
    notification: {
        title: 'Title',
        body: 'COUCOU',
        icon: 'assets/icons/icon-384x384.png',
        actions: [
            {action: 'bar', title: 'Focus last'},
            {action: 'baz', title: 'Navigate last'},
        ],
        data: {
            onActionClick: {
                default: {operation: 'openWindow'},
                bar: {
                    operation: 'focusLastFocusedOrOpen',
                    url: '/signin',
                },
                baz: {
                    operation: 'navigateLastFocusedOrOpen',
                    url: '/signin',
                },
            },
        },
    },
};

const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
};


/* socket NOTIF */
import {Server} from 'socket.io';
import http from 'http';

const httpServer = new http.Server(app);
const io = new Server(httpServer, {cors: {origin: 'http://localhost:4200', methods: ['GET', 'POST']}});
let nb = 0;

// send notification
app.get('/', (req, res) => {
    io.emit('notif', ++nb);
    webpush.sendNotification(subscription, JSON.stringify(payload), options);
    res.send('Hello World!');
});

httpServer.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});