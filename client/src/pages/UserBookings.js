// import Input from 'antd/es/input/Input';
import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllBookings } from '../redux/actions/bookingActions';

const UserBookings = () => {

    const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        dispatch(getAllBookings())
    }, [dispatch])

    return ( 
        <DefaultLayout>
            {loading && (<Spinner />)}
           <h1 className='text-center mt-3'>My Bookings</h1> 
           <Row justify='center'>
                <Col lg={16} sm={24}>
                    
            {bookings.filter(o=>o.user===user._id).map((booking, i) => {

                       console.log('booking12345', booking)
                     return   <Row gutter={16} className='bs1 mt-3 test-left' key={i}>
                        <Col lg={6} sm={24}>
                        <p><b>{booking.car.name}</b></p>
                    <p>Total hours : <b>{booking.totalHours}</b></p>
                    <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                    <p>Total amount : <b>{booking.totalAmount}</b></p>
                        </Col>
                        <Col lg={12} sm={24}>
                        <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
              
                        </Col>
                        <Col className='text-right' lg={6} sm={24}>
                            <img src={booking.car.image} height='140' className='p-2' alt='my bookings'/>
                        </Col>
                        </Row>
                        })}
                    
                </Col>
           </Row>
        </DefaultLayout>
    )
}

export default UserBookings;