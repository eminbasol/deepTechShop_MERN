import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer"
import { Button, Form, } from "react-bootstrap"
import { listProductDetails } from "../actions/productActions"


const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()


    const params = useParams()
    const productId = params.id

    const productDetails = useSelector(state => state.productDetails)
    const { isLoading, isError, product } = productDetails

    useEffect(() => {

        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
        }

    }, [dispatch, product, productId])

    const submitHandler = (e) => {
        e.preventDefault()
        // UPDATE PRODUCT
    }

    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {isLoading ? <Loader /> : isError ? <Message variant='danger' >{isError}</Message> : (
                    <Form onSubmit={submitHandler} >

                        <Form.Group controlId="name" className='mb-3' >
                            <Form.Label> Name </Form.Label>
                            <Form.Control
                                type='name'
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="category">
                            <Form.Label> Category </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter category "
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="brand">
                            <Form.Label> Brand </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter brand "
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock" className='mb-3' >
                            <Form.Label> Count In Stock </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price" className='mb-3' >
                            <Form.Label> Price </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="image">
                            <Form.Label> Image </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="description">
                            <Form.Label> Description </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Enter description "
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </>

    )
}

export default ProductEditScreen