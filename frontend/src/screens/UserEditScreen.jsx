import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from "../components/FormContainer"
import { getUserDetails, updateUser } from "../actions/userActions"
import { Button, Form, } from "react-bootstrap"
import { USER_UPDATE_RESET } from "../constants/userConstants"


const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params = useParams()
    const userId = params.id

    const userDetails = useSelector(state => state.userDetails)
    const { isLoading, isError, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate } = userUpdate

    useEffect(() => {
        if (isSuccessUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, user, userId, isSuccessUpdate] )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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