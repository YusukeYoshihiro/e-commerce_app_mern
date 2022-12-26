import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
    PayPalButtons,
    usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_REST, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);
const OrderScreen = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        };
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) =>
            acc + item.price * item.qty,
            0
        ));
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo) {
            navigate('login')
        }

        if (!order || order._id !== id || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_REST });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(id));
        }

    }, [dispatch, order, id, successPay, successDeliver, navigate, userInfo]);

    // For paypal 'createOrder'
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice }
                }
            ]
        });
    };

    // For paypal 'onApprove'
    const successPaymentHandler = (data, actions) => {
        return actions.order.capture().then(details => {
            dispatch(payOrder(id, details));
        });
    };

    // For stripe
    const redirectToCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch("/api/stripe/create-checkout-session", {
            method: "POST",
        });
        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            alert(result.error.message);
            console.log(result.error.message);
        }
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>
                                {order.user.email}
                            </a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered
                            ? (<Message variant='success'>Delivered on {order.deliveredAt}</Message>)
                            : (<Message variant='danger'>Not Delivered</Message>)
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid
                            ? (<Message variant='success'>Paid on {order.paidAt}</Message>)
                            : (<Message variant='danger'>Not Paid</Message>)
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && order.paymentMethod === 'PayPal' ? (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {isPending && <Loader />}
                                {isRejected && (
                                    <Message variant="danger">SDK load error</Message>
                                )}
                                {isResolved && (
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>) : (null)}

                        {!order.isPaid && order.paymentMethod === 'Stripe' ? (
                            <ListGroup.Item>
                                <h2>Stripe</h2>
                                <Button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    disabled={order.orderItems === 0}
                                    onClick={redirectToCheckout}
                                    role="link"
                                    style={{ width: '100%' }}
                                >
                                    Pay ${order.totalPrice}
                                </Button>
                            </ListGroup.Item>) : (null)}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    style={{ width: '100%' }}
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen