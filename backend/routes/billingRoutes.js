import Stripe from 'stripe';
import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();
const stripe = new Stripe('sk_test_51HCEftK0gTkqzdS7mts9EflhFGFzTmj7a5fv5I4H7gMnYCnZkja50cC9iXO1gGWTVU24NGHH9mvDvtIywHC5TxOm00tRnoE10t');
// console.log('process.env.STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY);

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
    if (order) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${baseUrl}/success`,
            cancel_url: baseUrl,
            line_items: lineItems,
        });

        res.json({ id: session.id });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

export default router;