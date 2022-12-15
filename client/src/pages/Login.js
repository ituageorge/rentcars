import React from 'react'
import {Link } from 'react-router-dom'
import {Row, Col, Form, Input} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/userAction'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Spinner from '../components/Spinner'
// ..
AOS.init();

function Login() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)
       }

    return(
        <div className='login'>
            {loading && (<Spinner />)} 
                
           
          <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{position:'relative'}}>
                    <img 
                    alt='loginimage'
                    data-aos='slide-right'
                    data-aos-duration='1500'
                    src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' />
                    <h1 className='login-logo'>GeorgeMotors</h1>
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <button className='btn1 mt-2 mb-2'>Login</button>
                        <br />
                        <Link to='/register'>Click here to register </Link>
                    </Form>
                </Col>

          </Row>
        </div>
    )
}

export default Login