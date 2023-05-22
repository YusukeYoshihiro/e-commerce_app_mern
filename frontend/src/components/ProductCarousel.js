import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch,]);

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Col sm={10} md={10} xs={9}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Carousel.Caption className='carousel-caption'>
                                        <h2 className='carousel_caption_text'>{product.name} ($ {product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    )
}

export default ProductCarousel