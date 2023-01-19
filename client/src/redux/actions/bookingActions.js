import { message } from 'antd'
import axios from 'axios'

export const bookCar = (reqObj) => async dispatch =>{
    dispatch({type: 'LOADING', payload: true})
   
    try {
         await axios.post('/api/bookings/bookcar', reqObj)
       
      dispatch({type: 'LOADING', payload: false})
        message.success('Your car booked successfully') 
        setTimeout(() => {
        window.location.href='/userbookings'
        }, 500);

       
        // dispatch({type: 'LOADING', payload:false})

    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
        message.error('Something went wrong, please try later')
    }
}


export const getAllBookings = ()=> async dispatch =>{
    dispatch({type: 'LOADING', payload:true})
   
    try {
          dispatch({type: 'LOADING', payload: false})

        const response = await axios.get('/api/bookings/getallbookings')
//   dispatch({ type: "LOADING", payload: false });
       
        // console.log('response2334', response)

        dispatch({type: 'GET_ALL_BOOKINGS', payload: response.data})

        // console.log('response', response.data)
              
    } catch (error) {
        // console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}





