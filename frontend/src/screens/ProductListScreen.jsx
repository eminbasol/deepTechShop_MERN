import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Col, Table, Row } from "react-bootstrap"
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { deleteProduct, listProducts } from "../actions/productActions"

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { isLoading, isError, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, isSuccessDelete])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        // CREATE PODUCT
    }

    return (
        <>
            <Row className='align-items-cennter'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler} >
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>
            {isLoadingDelete && <Loader/>}
            {isErrorDelete &&  <Message variant='danger'>{isErrorDelete}</Message> }
            {isLoading ? <Loader /> : isError ? <Message variant='danger'>{isError}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={
                                        () => deleteHandler(product._id)
                                    }>
                                        <FaTrash />
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen