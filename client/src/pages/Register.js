import React from 'react'
import {Row, Col, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userRegister } from '../redux/actions/userAction'


function Register() {
    const dispatch = useDispatch() 
   function onFinish(values) {
    dispatch(userRegister(values))
    console.log(values)
   }

    return(
        <div className='login'>
          <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{position:'relative'}}>
                    <img src='https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=740&t=st=1670439611~exp=1670440211~hmac=f47db0d5996ac3591f0e7f6bc585cc8319af251e326a6eceb00c4e28957b4406' />
                    <h1 className='login-logo'>GeorgeMotors</h1>
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <button className='btn1 mt-2 mb-3'>Register</button>
                            <br />
                        <Link to='/login'>Click here to log in</Link>
                    </Form>
                </Col>

          </Row>
        </div>
    )
}

export default Register