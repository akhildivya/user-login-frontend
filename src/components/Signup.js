import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '../service/allapis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const navigate = useNavigate()
    const [unameValid, setUnamevalid] = useState(false)
    const [emailValid, setEmailvalid] = useState(false)
    const [passwordValid, setPasswordvalid] = useState(false)
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const getData = (e) => {
        const { name, value } = e.target
       
        if (name == 'username') 
        {
            if(value.match(/^[a-zA-Z .]+$/))
            {
                setUnamevalid(false)
            }
            else{
                setUnamevalid(true)
            }
        }

        if (name == 'email') 
            {
                if(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
                {
                    setEmailvalid(false)
                }
                else{
                    setEmailvalid(true)
                }
            }

            if (name == 'password') 
                {
                    if(value.match(/^[a-zA-Z0-9]+$/))
                    {
                        setPasswordvalid(false)
                    }
                    else{
                        setPasswordvalid(true)
                    }
                }
                setUser({ ...user, [name]: value })
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        const { username, email, password } = user
        if (!username || !email || !password) {
            toast.warn('please fill all fields', {
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
            const result = await signupApi(user)
            console.log(result);
            if (result.status == 200) {

                toast.success(`${result.data}`, {
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
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
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
            }
            setUser({
                username: "",
                email: "",
                password: ""
            })

        }
    }
    

    return (
        <div className='container w-50 shadow-lg mt-5'>
            <Row>
                <Col>
                    <img src="https://i.postimg.cc/FFptZP6W/undraw-Access-account-re-8spm.png" width={'350px'} height={'300px'} alt="" />
                </Col>
                <Col>
                    <h3 className='text-center p-3 '>Sign up</h3>

                   <>
                        <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                            <Form.Control value={user.username} name="username" type="text" placeholder="username" onChange={(e) => getData(e)} />
                        </FloatingLabel>
                        {unameValid && <p className='text-danger'>invalid username</p>}
    
                   </>


                  <>
                        <FloatingLabel  controlId="floatingEmail" label="Email address" className="mb-3">
                            <Form.Control value={user.email} name="email" type="email" onChange={(e) => getData(e)} placeholder="name@example.com" />
                        </FloatingLabel>
                        {emailValid && <p className='text-danger'>invalid email id</p>}
                  </>

                  <>
                        <FloatingLabel  controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control value={user.password} name="password" type="password" onChange={(e) => getData(e)} placeholder="Password" />
                        </FloatingLabel>
                        {passwordValid && <p className='text-danger'>invalid password</p>}
                  </>

                    <div className='d-flex justify-content-around' >
                        <Button id='loginbutton' className=' btn-outline-success rounded-pill' onClick={(e) => handleSignup(e)}>Sign up</Button>
                        <Link to={'/login'} className='p-1' style={{ textDecoration: 'none' }}>Already have account?</Link>
                    </div>
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}

export default Signup