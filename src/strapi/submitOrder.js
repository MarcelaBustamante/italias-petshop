import axios from 'axios';
import url from './URL';

async function submitOrder({name,total,items,userToken}){
    console.log({name, total,items,userToken })
    const response = await axios.post(`${url}/orders`,{
        name,total,items

    },{
       headers:{
           Authorization: `Bearer ${userToken}`,
       } 
    }).catch(error=>console.log(error));
    return response;
}

export default submitOrder;