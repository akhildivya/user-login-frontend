import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { loginApi } from '../service/allapis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [emailValid, setEmailvalid] = useState(false)
    const [passwordValid, setPasswordvalid] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const getData = (e) => {
        const { name, value } = e.target
        if (name == 'email') 
        {
            if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) 
            {
                setEmailvalid(false)
            }
            else 
            {
                setEmailvalid(true)
            }
        }

        if (name == 'password') 
        {
            if (value.match(/^[a-zA-Z0-9]+$/)) 
            {
                setPasswordvalid(false)
            }
            else 
            {
                setPasswordvalid(true)
            }
        }
        setUser({ ...user, [name]: value })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (!email || !password) {
            toast.warn('All fields are required', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            const result = await loginApi(user)
            if (result.status == 200) {
                toast.success(`welcome ${result.data.username}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setUser({
                    email: "",
                    password: ""
                })

            }
            else {
                toast.error(`${result.response.data}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                setUser({
                    email: "",
                    password: ""
                })
            }

        }
    }
    return (
        <div className='container w-50 shadow-lg mt-5'>
            <Row>
                <Col>
                    <img className='img-fluid' src="https://i.postimg.cc/RVPCcGrc/undraw-Mobile-login-re-9ntv.png" width={'350px'} height={'300px'} alt="" />
                </Col>
                <Col>
                    <h3 className='text-center p-3 '>Login</h3>
                    <>
                        <FloatingLabel controlId="floatingInput" label="Email id" className="mb-3">
                            <Form.Control value={user.email} name="email" placeholder="Email address" onChange={(e) => getData(e)} type="email" />
                        </FloatingLabel>
                        {emailValid && <p className='text-danger'>invalid email id</p>}
                    </>

                    <>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control value={user.password} name="password" placeholder="Password" onChange={(e) => getData(e)} type="password" />
                        </FloatingLabel>
                        {passwordValid && <p className='text-danger'>invalid password</p>}
                    </>


                    <div className='d-flex justify-content-around' >
                        <Button id='loginbutton'  type="button"  onClick={(e) => handleLogin(e)}>Login</Button>
                       
                        <Link className='p-3' to={'/'} style={{ textDecoration: 'none' }}>New User?</Link>
                    </div>
                </Col>
            </Row>

            <ToastContainer />
        </div>

    )
}

export default Login