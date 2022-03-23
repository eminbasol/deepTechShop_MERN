import { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



const PaymentScreen = () => {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return <FormContainer >
        <CheckoutSteps step1 step2 step3 />
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler} >
            <Form.Group>
                <Form.Label as='legend' >
                    Select Method
                </Form.Label>
                <Col className='mb-3'>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymetMethod'
                        value='PayPal'
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        checked={paymentMethod === 'Stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Contunie
            </Button>

        </Form>


    </FormContainer>
}

export default PaymentScreen