
import React, { useRef, useState } from 'react'
import '../../styles/Managing/ItemEditing.css'
import { GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { setEditing } from '../../redux/ducks/appVars'
import { DATA_Ref } from '../../firebase'
import { setItems } from '../../redux/ducks/storeItems'

export default function ItemEditing() {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.appVars.editing)
    const owner = useSelector(state => state.user.owner)
    const form = useRef()
    const item = editing[1]
    const newItem = item._new
    const [name, setName] = useState(newItem?'':item.name)
    const [time, setTime] = useState(newItem?0:item['cooking time'])
    const [price, setPrice] = useState(newItem?0:item.price)
    const [addOns, setAddOns] = useState(newItem?'':item["add'ons"].join(','))
    const [msg, setMsg] = useState('')
    const ready = name.length>0 && name.split('').filter(c=>c===' ').length<name.length && price>0 && time>0 

    function clear() {
        setTimeout(() => {
            setMsg('')
        }, 3000);
    }

    function addItem() {
        const _name = name.trim()
        const _addOns = addOns.trim().split(',')
        const _price = price
        const _time = time
        DATA_Ref.add({
            name:_name,
            price:_price,
            "cooking time":_time,
            "add'ons":_addOns,
            available:false,
            image:'defaultNoPic.jpg?alt=media&token=871a946e-e782-4a89-9573-80cad208be7f',
            restaurant:owner.storeName,
            providerLocation:{
                _lat:owner.location._lat,
                _long:owner.location._long
            }
        })
        .then((docRef) => {
            setMsg('item successfully added!',clear())
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    function updateItem() {
        const _name = name.trim()
        const _addOns = addOns.trim().split(',')
        const _price = price
        const _time = time
        let docRef = DATA_Ref.doc(item.id)
        docRef.update({
            name:_name,
            price:_price,
            "cooking time":_time,
            "add'ons":_addOns
        })
        .then(() => {
            console.log("Document successfully updated!");
            setMsg('item successfully updated!',clear())
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    function AskToDelete() {
        let confirmed = window.confirm("Are you sure you want to delete this?")
        if(confirmed){
            deleteItem()
        }
    }

    function deleteItem() {
        DATA_Ref.doc(`${item.id}`).delete().then(() => {
            console.log("Document successfully deleted!");
            setMsg('item successfully deleted!',clear())
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function refresh(storeName){
        DATA_Ref.where("restaurant", "==", `${storeName}`).get()
        .then( snapshot => dispatch(setItems(snapshot.docs.map( doc => ({ ...doc.data() , id:doc.id })))))
        .catch((error) => {console.log("Error", error)})
    }

    function switchAvailability() {
        let docRef = DATA_Ref.doc(item.id)
        docRef
        .update({
        available: !item.available
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        refresh(owner.storeName)
    }

    return (
        <div id='item-editing' >
            <div className='c' style={{backgroundColor:item.available?'rgb(0,255,0)':'rgb(255,0,0)'}} />        
            <GrClose id='close-btn' onClick={()=>dispatch(setEditing([false,{}]))} size={30} />
            <img src={`https://firebasestorage.googleapis.com/v0/b/babdar-2e214.appspot.com/o/${item._new?'defaultNoPic.jpg?alt=media&token=871a946e-e782-4a89-9573-80cad208be7f':item.image}`} id='item-img' />
            {
                newItem?
                null:
                <div style={{alignSelf:'stretch',display:'flex',justifyContent:'center'}} >
                    <button onClick={()=>switchAvailability()} style={{backgroundColor:'rgb(255,230,200)',textAlign:'center',verticalAlign:'center',borderRaduis:'15px',padding:'6px'}} value={'switch'} >switch</button>
                    <button onClick={()=>AskToDelete()} style={{backgroundColor:'rgb(255,0,0)',textAlign:'center',verticalAlign:'center',borderRaduis:'15px',padding:'6px'}} value={'delete'} >delete</button>
                </div>                
            }
            <form ref={form} 
            onSubmit={(e)=>{
                e.preventDefault()
                if(newItem && ready){
                    addItem()
                }else if(ready){
                    updateItem()
                }else{
                    setMsg('Please enter valid data.',clear())
                }
            }} 
            id='form-editing' >
                <p>{msg}</p>
                <p className='label name-label'>Name:</p>
                <input required={true} className='input' name='name' type='text' value={name} onChange={txt=>setName(txt.target.value.trim())} />
                <p className='label time-label'>Time:</p>
                <input required={true} className='input' name='time' type='number' value={time} onChange={txt=>setTime(txt.target.value.trim())} />
                <p className='label price-label'>Price:</p>
                <input required={true} className='input' name='price' type='number' value={price} onChange={txt=>setPrice(txt.target.value.trim())} />
                <p className='label add-ons-label'>Add'Ons:</p>
                <input className='input' name='add-ons' type='text' value={addOns} onChange={txt=>setAddOns(txt.target.value.trim())} />
                <input className='submit' type={'submit'} value={newItem?'add':'update'}/>
            </form>                
        </div>
    )
}

