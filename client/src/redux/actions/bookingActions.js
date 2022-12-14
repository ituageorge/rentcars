import { message } from 'antd'
import axios from 'axios'

export const bookCar = (reqObj)=> async dispatch =>{
    dispatch({type: 'LOADING', payload:true})
   
    try {
         await axios.post('/api/bookings/bookcar', reqObj)
       
        dispatch({type: 'LOADING', payload:false})
        message.success('Your car booked successfully')      
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
        message.error('Something went wrong, please try later')
    }
}

