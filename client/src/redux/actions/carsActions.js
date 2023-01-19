import axios from 'axios'
import { message } from 'antd'

export const getAllCars = ()=> async dispatch =>{
    dispatch({type: 'LOADING', payload:true})
   
    try {
        const response = await axios.get('/api/cars/getallcars')
//   dispatch({ type: "LOADING", payload: false });
       
        // console.log('response2334', response)

        dispatch({type: 'GET_ALL_CARS', payload: response.data})

          dispatch({type: 'LOADING', payload: false})
        // console.log('response', response.data)
              
    } catch (error) {
        // console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}

export const addCar = (reqObj) => async dispatch => {

    dispatch({type: 'LOADING', payload:true}) 

    try {
         await axios.post('/api/cars/addcar', reqObj)
         dispatch({type:'LOADING', payload: false})

        message.success('New car added successfully')

        setTimeout(() => {
            window.location.href='/'
        }, 500);

          dispatch({type: 'LOADING', payload: false})
              
    } catch (error) {
        dispatch({type: 'LOADING', payload:false})
    }
}


export const editCar = (reqObj) => async dispatch => {

    dispatch({type: 'LOADING', payload:true}) 

    try {
         await axios.post('/api/cars/editcar', reqObj)
         dispatch({type:'LOADING', payload: false})

        message.success('Car edited successfully')

        setTimeout(() => {
            window.location.href='/admin'
        }, 500);

          dispatch({type: 'LOADING', payload: false})
              
    } catch (error) {
        dispatch({type: 'LOADING', payload:false})
    }
}

export const deleteCar = (reqObj) => async dispatch => {

    dispatch({type: 'LOADING', payload:true}) 

    try {
         await axios.post('/api/cars/deletecar', reqObj)
         dispatch({type:'LOADING', payload: false})

        message.success('Car deleted successfully')

        setTimeout(() => {
            window.location.reload()
        }, 500);

        //   dispatch({type: 'LOADING', payload: false})
              
    } catch (error) {
        dispatch({type: 'LOADING', payload:false})
    }
}
