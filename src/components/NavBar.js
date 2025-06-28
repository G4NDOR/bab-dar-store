

import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedPage } from '../redux/ducks/appVars'
import '../styles/NavBar.css'

export default function NavBar() {

    const dispatch = useDispatch()

    function goTo(page) {
        dispatch(setSelectedPage(page))
    }

    return (
        <div id='nav-bar' >  
        <div className='nav-btn managing' onClick={()=>goTo('Managing')} >Manage</div>
        <div className='nav-btn orders' onClick={()=>goTo('Orders')} >Orders</div>
        </div>
    )
}

