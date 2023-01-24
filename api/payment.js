const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY);

const payment = express.Router();

//creating post request 
payment.post("/checkout_payment", async(request, response) => {
    const { amount } = request.body;
    const paymentIntents = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        payment_method_types: ['card']
    });
    try {
        response.status(200).send({ clientSecret: paymentIntents.client_secret });
    } catch (error) {
        response.status(500).send(err.message);
    }
});

module.exports = payment;