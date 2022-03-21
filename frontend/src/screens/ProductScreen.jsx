
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, ListGroup, Button, ListGroupItem } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import { listProductDetails } from "../actions/productActions"
import Message from '../components/Message'
import Loader from '../components/Loader'


const ProductScreen = ({ match }) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { isLoading, isError, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])



    return <>
        <Link className="btn btn-light my-3" to='/'>
            Go Back
        </Link>
        {isLoading ? <Loader /> : isError ? <Message variant='danger' >{isError}</Message> : (
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.rating &&
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />}
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        )}

    </>


}

export default ProductScreen