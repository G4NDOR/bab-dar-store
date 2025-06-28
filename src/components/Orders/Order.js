
import React from 'react'
import { useDispatch } from 'react-redux'
import { setOrderView } from '../../redux/ducks/ordersManager'
import '../../styles/Orders/Order.css'

export default function Order({order,...props}) {

    const dispatch = useDispatch()

    return (
        <div className='order' onClick={()=>dispatch(setOrderView([true,order]))} style={{backgroundColor:order.cancelled || !order.accepted?"rgb(190,190,190)":(order.ready?"rgb(200,255,200)":"rgb(255,200,200)")}} >
            <>{order.to}#{order.id}</>
            <>  {order.createdAt.split(';')[1]}</>
        </div>
    )
}

