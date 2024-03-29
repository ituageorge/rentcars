import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Row, Col , Button } from 'antd';
import { Link } from 'react-router-dom';


function DefaultLayout(props) {
const user =JSON.parse(localStorage.getItem('user'))

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
    HOME </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/userbookings">
       Bookings
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/admin">
       Admin
      </a>
    )
  },
  {
    key: '4',
    label: (
      <Button onClick={()=>{
        localStorage.removeItem('user');
        window.location.href='/login'
      }}>
       Log Out
      </Button>
    )
  },
];




    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                    <div className='d-flex justify-content-between'>
                    <h1><Link to='/'>George Motors</Link></h1>
                    <Dropdown
    menu={{
      items,
    }}
  >
   
    <Button onClick={(e) => e.preventDefault()}>
    {user.username}
        <UserOutlined />
    </Button>
   
  </Dropdown>
                </div>
                    </Col>
                </Row>
                
            </div>
            <div className='content'>
                {props.children}
            </div>

        </div>
    )
}

export default DefaultLayout