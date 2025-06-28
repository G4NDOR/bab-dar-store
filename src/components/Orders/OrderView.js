
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { database, db } from '../../firebase'
import { setOrderView } from '../../redux/ducks/ordersManager'
import { GrClose } from 'react-icons/gr'
import '../../styles/Orders/OrderView.css'

function Line({name,value,...props}) {
    return <div className='order-el'>
        <h4>{name}</h4>
        <h5>{value}</h5>
    </div>
}

function Item({product,...props}) {

    const count = product.amount

    return <div className='order-item' >
        <div style={{display:'flex',}} >
            <img style={{
                height:'50px',
                width:'50px',
                borderRadius:'15px',
                overflow:"hidden"
            }} 
            src={`https://firebasestorage.googleapis.com/v0/b/babdar-2e214.appspot.com/o/${product.image}`} />
            <div style={{display:'flex',flexDirection:'column',alignSelf:"stretch",margin:'0 0 0 10px'}} >
                <p style={{
                    margin:'0 0 5px 0',
                    fontWeight:"bold",
                    fontSize:'15px',
                }} >{product.name}</p>
                <p style={{
                    margin:'0',
                    fontWeight:"bold",
                    fontSize:'15px',
                    color:'gray',
                }} >from {product.restaurant}</p>
            </div>
        </div>
        <p style={{
            //padding:'1px',
            borderRadius:'50px',
            backgroundColor:'green',
            textAlign:"center",
            verticalAlign:"middle",
            position:"absolute",
            top:'-6px',
            left:'6px',
            minWidth:'25px',
            minHeight:'25px',
            color:'black'
        }} >x{count}</p>
    </div>
}

export default function OrderView() {

    const dispatch = useDispatch()
    const orderView = useSelector(state => state.ordersManager.orderView)
    const appUser = useSelector(state => state.user.appUser)
    const owner = useSelector(state => state.user.owner)
    const order = orderView[1]
    const commission = order.commission
    const netRevenue = 1 - commission
    const orderPrices = order.products.map(item=>item.price*item.amount)
    const count = orderPrices.length>1?orderPrices.reduce((previousItem, currentItem) => previousItem + currentItem):orderPrices[0]

    function updateOrderComfirmed() {
        var updates = {};
        updates['ready'] = true;
    
        return database.ref(`/orders/${order.id}`).update(updates);
    }

    function acceptOrderComfirmed() {
        var updates = {};
        updates['accepted'] = true;
    
        return database.ref(`/orders/${order.id}`).update(updates);
    }
            
    function updateOrder() {
        let confirmed = window.confirm("Are you sure the order is ready?")
        if(confirmed){
            updateOrderComfirmed()
            updateOwnerInfo()
        }
    }

    function acceptOrder() {
        let confirmed = window.confirm("Are you sure you want to accept this order?")
        if(confirmed){
            acceptOrderComfirmed()
        }
    }
            
    function updateOwnerInfo() {
        let docRef = db.collection('owners').doc(`${appUser.uid}`);
        let updates = {};
        updates['revenue'] = owner.revenue + count * netRevenue 
        
            
        return docRef.update(updates);
    }

    function cancelOrder() {
        var updates = {};
        updates['cancelled'] = true;
    
        return database.ref(`/orders/${order.id}`).update(updates);
    }

    function tryToCancel() {
        let confirmed = window.confirm("Are you sure you want to cancel this order?")
        if(confirmed){
            cancelOrder()
        }
    }

    return (
        <div id='order-view' >
            <GrClose id='close-btn' onClick={()=>dispatch(setOrderView([false,{}]))} size={30} />
            <Line name={'Id'} value={order.id} />
            <Line name={'Costumer'} value={order.to} />
            <Line name={'Received at'} value={order.createdAt.split(';')[1]} />
            <Line name={'Expected at'} value={order.expectedReadyAt} />
            <h3>Items</h3>
            { 
            order.products.map(item=><Item product={item}/>)
            }
            <h3>Description</h3>
            <p style={{marginBottom:'30px'}} >
                {
                order.description!==' '?order.description:'No description provided.'
                }            
            </p>        
            <Line name={'Order'} value={`${count}DH`} />
            <Line name={'Fees'} value={`${count * commission}DH`} />
            <Line name={'Subtotal'} value={`${count * netRevenue}DH`} />     
            <div>
                {
                    !order.accepted?
                    <button id='order-accepted-btn'
                    onClick={()=>{
                        if(!order.accepted){
                            acceptOrder()
                        }
                    }} style={{backgroundColor:'green'}} >Accept</button>:
                    <>
                        <button id='order-ready-btn'
                        onClick={()=>{
                            if(!order.received && !order.ready && !order.cancelled){
                                updateOrder()
                            }
                        }} style={{backgroundColor:order.ready || order.cancelled?'gray':'green'}} >Done</button>   
                        <button id='order-cancel-btn'
                        onClick={()=>{
                            if(!order.cancelled){
                                tryToCancel()
                            }                
                        }} style={{backgroundColor:order.cancelled?'gray':'red'}} >Cancel</button>                      
                    </>                    
                }
            </div>
        </div>
    )
}
