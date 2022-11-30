// const stripe = require('stripe')(keys.stripeSecretKey);
import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

router.post('/create-checkout-session', asyncHandler(async (req, res) => {
    const baseUrl = res.req.headers.referer;
    const orderId = baseUrl.split('/')[4];

    const order = await Order.findById(orderId);
    const lineItems = order.orderItems.map((item) => ({
        price_data: {
            currency: 'cad',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.qty,
    }))
    // console.log(lineItems)
    if (order) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${baseUrl}/orderSuccess`,
            cancel_url: baseUrl,
            line_items: lineItems
        });

        // console.log('session', session)
        res.json({ id: session.id });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

export default router;
