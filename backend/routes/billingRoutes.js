// const stripe = require('stripe')(keys.stripeSecretKey);
import express from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
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
    const user = await User.findById(order.user);

    const lineItems = order.orderItems.map((item) => ({
        price_data: {
            currency: "cad",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
            /** TODO 
             * add tax and shipping
             */
            // tax_behavior: "exclusive",
        },
        quantity: item.qty,
    }))

    if (order) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${baseUrl}`,
            cancel_url: baseUrl,
            line_items: lineItems,
            customer_email: user.email,
        });
        console.log(session);

        if (session.id) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: session.id,
                status: 'COMPLETED',
                update_time: order.updatedAt,
                email_address: session.customer_email,
            }
            const updateOrder = await order.save();
        }

        res.json({ id: session.id });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

export default router;
