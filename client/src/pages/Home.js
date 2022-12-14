import React, { useEffect } from 'react'
import { Button, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'

import Spinner from '../components/Spinner';

// useSelector is for accessing the reducer data in the component
function Home() {
    const {cars } = useSelector(state=> state.carsReducer)
    const {loading } = useSelector(state=>state.alertsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCars())
       
}, [dispatch])

    return(
        // <div>
            <DefaultLayout>
              <Row>
                <Col lg={20} sm={24} xs={24}>
                
                </Col>
              </Row>
            {loading === true && (<Spinner/>)}
            <Row justify='center' gutter={16} className='mt-5'>
              {cars.map(car =>{
                return <Col lg={5} sm={24} xs={24}>
                    <div className='car p-2 bs1 '>
                     <img src={car.image} className='carimg' alt='car' />
                     <div className='car-content d-flex align-items-center justify-content-between'>
                        <div>
                            <p>{car.name}</p>
                            <p>{car.rentPerHour} Rent Per Hour /</p>
                        </div>
                        <div>
                          <Button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></Button>
                        </div>
                     </div>
                    </div>
                    
                </Col>
              })}  
            </Row>


            </DefaultLayout>
        // </div>
    )
}

export default Home