
import React from 'react'
import '../../styles/Managing/PlusBtn.css'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setEditing } from '../../redux/ducks/appVars'

export default function PlusBtn() {

    const dispatch = useDispatch()

    function add() {
        dispatch(setEditing([true,{_new:true}]))
    }

    return (
        <div id='plus-btn' onClick={()=>add()} >
        <FaPlus size={100} color='rgb(220,220,220)' />
        </div>
    )
}

