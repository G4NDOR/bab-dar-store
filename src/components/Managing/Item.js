
import React from 'react'
import '../../styles/Managing/Item.css'
import { BiPencil } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { DATA_Ref } from '../../firebase'
import { setItems } from '../../redux/ducks/storeItems'
import { setEditing } from '../../redux/ducks/appVars'

function Line({name,value,...props}) {
    return <div className='line'>
        {name} : {value}
    </div>
}

export default function Item({item,...props}) {

    const dispatch = useDispatch()
    const owner = useSelector(state => state.user.owner)

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

    function edit() {
        dispatch(setEditing([true,item]))
    }
            
    return (
        <div className='item' >
            <img src={`https://firebasestorage.googleapis.com/v0/b/babdar-2e214.appspot.com/o/${item.image}`} className='item-img' />
            <Line name='Name' value={item.name} />
            <Line name='Time' value={item['cooking time']} />
            <Line name='Price' value={item.price} />
            <Line name="Add'ons" value={null} />
            <ul className='ul' >
            {
                item["add'ons"].map(addOn=><li className='li' >{addOn}</li>)
            }
            </ul>
            <div className='c' style={{backgroundColor:item.available?'rgb(0,255,0)':'rgb(255,0,0)'}} />
            <div className='switch' onClick={()=>{switchAvailability()}} >switch</div>
            <div className='edit' onClick={()=>edit()} >edit<BiPencil/></div>
        </div>
    )
}

