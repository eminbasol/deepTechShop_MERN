import { useEffect } from "react"
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from "../actions/cartActions"
import { FaTrash } from 'react-icons/fa'



const CartScreen = () => {
    const params = useParams()
    const productId = params.id
    const location = useLocation()
    const navigate = useNavigate()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0
                ? <Message variant='info'>Your cart is empty <Link to='/'>Go Back</Link></Message>
                : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='danger'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                        ))}
                    </ListGroup>
                )}
        </Col>
        <Col md={4}>
            <Card >
                <ListGroup variant='flush' >
                    <ListGroupItem>
                        <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
}

export default CartScreen