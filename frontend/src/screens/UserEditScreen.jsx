import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer"
import { getUserDetails } from "../actions/userActions"
import { Button, Form, } from "react-bootstrap"


const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    const dispatch = useDispatch()
    const params = useParams()

    const userId = params.id

    const userDetails = useSelector(state => state.userDetails)
    const { isLoading, isError, user } = userDetails

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                        <Form.Group controlId="email" className='mb-3' >
                            <Form.Label> Email Address </Form.Label>
                            <Form.Control
                                type='email'
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="isAdmin">
                            <Form.Check
                                type='checkbox'
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
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

export default UserEditScreen