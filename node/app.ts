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
    endpoint: 'https://fcm.googleapis.com/fcm/send/di-IvdTmn84:APA91bF6XsArB6TitcoGLFESJkcDFHxxCVTRadn3I6VHuR5c3z15RLYjwWwsO-ZoPGKxP8S153iDLddOCof8UKfPOqGHpMbMsn6XA2JDrhRAREVevJ5wJi2ub3_QCjBQAjc0t27QoSfi',
    expirationTime: null,
    keys: {
        auth: 'ZlEyUmZGMqKttxsfpex2Mw',
        p256dh: 'BHAPi98QhqHDwcdI7h8xHwiDwfZUdhu_v0p1g9cZgjgbrmXGq1JMZdN2XY6qmqZ-BagSR3ZOKQiWU18_7_YXu8c',
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
    res.send('Hello World!');
});

httpServer.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});