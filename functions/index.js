const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51KmCeNSDFeW3uiPTVxG1zH9o3C6JN9qgzAwaLsc7BU3Sd8F7FN2QXpZdiDgY7eZg6wpNguQnaNtkwibfDNyOBZ0y0021fSNhc8');

//App Config
const app = express();

//Middlewares
app.use(cors({origin: true}));


app.use(express.json());


//APT routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payment/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request received boom for this amount >> ', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });
    
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

exports.api = functions.https.onRequest(app);
