import axios from 'axios'

export const getAllCars = ()=> async dispatch =>{
    dispatch({type: 'LOADING', payload:true})
   
    try {
        const response = await axios.get('/api/cars/getallcars')
       
        console.log('response2334', response)

        dispatch({type: 'GET_ALL_CARS', payload: response.data})
        dispatch({type: 'LOADING', payload:false})
        console.log('response', response.data)
              
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}

