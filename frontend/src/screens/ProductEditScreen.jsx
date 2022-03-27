import axios from 'axios'
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer"
import { Button, Form } from "react-bootstrap"
import { listProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"


const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params = useParams()
    const productId = params.id

    const productDetails = useSelector(state => state.productDetails)
    const { isLoading, isError, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate } = productUpdate

    useEffect(() => {
        if (isSuccessUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
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
        }

    }, [dispatch, product, productId, navigate, isSuccessUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                'Content-Type': 'multipart/form-data'
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }


    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {isLoadingUpdate && <Loader />}
                {isErrorUpdate && <Message variant='danger' >{isErrorUpdate}</Message>}
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

                        <Form.Group className='mb-3'controlId="image">
                            <Form.Label >
                                Image
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            <Form.Control
                                type="file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
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