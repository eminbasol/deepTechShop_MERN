import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { listProducts } from "../actions/productActions"


const HomeScreen = () => {
    const dispacth = useDispatch()

    // variable names in store.js
    const productList = useSelector(state => state.productList)
    const { isLoading, isError, products } = productList
    useEffect(() => {
        dispacth(listProducts())
    }, [dispacth])

    return (
        <>
            <h1>Lastest Products</h1>
            {isLoading ? <h2>Loading...</h2> : isError ? <h3>{isError}</h3> : (
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            )}
        </>
    )
}

export default HomeScreen