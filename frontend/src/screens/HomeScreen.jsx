import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../actions/productActions"
import { useParams } from "react-router-dom"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"



const HomeScreen = () => {
    const dispacth = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    // variable names in store.js
    const productList = useSelector(state => state.productList)
    const { isLoading, isError, products, page, pages } = productList

    useEffect(() => {
        dispacth(listProducts(keyword, pageNumber))
    }, [dispacth, keyword, pageNumber])

    return (
        <>
            {!keyword && <ProductCarousel /> }
            <h1>Lastest Products</h1>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant='danger'>{isError}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen