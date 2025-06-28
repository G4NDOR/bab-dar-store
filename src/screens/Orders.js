
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Order from '../components/Orders/Order'
import '../styles/Orders/Orders.css'
import { database } from '../firebase';
import { addOrders, setUpdatedOrders } from '../redux/ducks/ordersManager'
import OrderView from '../components/Orders/OrderView'
import SectionTitle from '../components/Orders/sectionTitle'

export default function Orders() {

    const dispatch = useDispatch()
    const orders = useSelector(state => state.ordersManager.orders)
    const orderView = useSelector(state => state.ordersManager.orderView)
    const updatedOrders = useSelector(state => state.ordersManager.updatedOrders)
    const owner = useSelector(state => state.user.owner)

    useEffect(() => {
        const l = 
        database
        .ref('/orders').orderByChild('from').equalTo(`${owner.storeName}`)
        .on('value', snapshot  => {
        const obj = snapshot.val()
        const asArray = Object.entries(obj)
        const filtered = asArray.filter(([key, value]) => (key!=='none' ) )//&& orders.filter(ordr=>ordr.id===key).length<1 && value['from']===provider 
        const AllOrders = filtered.length>0? filtered.map(([key,value])=>({...value,id:key})):[]
        dispatch(setUpdatedOrders(AllOrders))

        },error=>{
        console.log(error)
        })
        //dispatch(toggleLoading(false))
        return ()=>{
        //console.log('++++++++++++++++++++++++++++')
        database
        .ref('/orders').orderByChild('from').equalTo(`${owner.storeName}`)
        .off('value',l)
        }
    }, [])

    useEffect(() => {
        const newOrders = {}
        // && o.received===ordr.received
        //console.log('++++++++++++++++++++++++++++++++++++++++++++++++')
        //console.log('newOrders',newOrders)
        updatedOrders.filter(ordr=>Object.entries(orders).filter(([id,o])=>( id===ordr.id && o.ready===ordr.ready && o.cancelled===ordr.cancelled && o.accepted===ordr.accepted )).length===0).map(item=>{newOrders[item.id]=item})
        //console.log('newOrders',newOrders)
        dispatch(addOrders(newOrders))
    }, [updatedOrders])

    return (
        <div className='Page' >
        <NavBar/>
        <SectionTitle title="Not Accepted"/>
        {
            Object.entries(orders).length > 0?
            Object.entries(orders).filter(([id,order])=>!order.accepted)
            .map(([id,order])=><Order order={order} />):
            <p>you have currently no orders</p>
        }
        <SectionTitle title="Accepted"/>
        {
            Object.entries(orders).length > 0?
            Object.entries(orders).filter(([id,order])=>order.accepted)
            .map(([id,order])=><Order order={order} />):
            <p>you have currently no orders</p>
        }
        {
            orderView[0]?
            <OrderView/>:
            null
        }
        </div>
    )
}

