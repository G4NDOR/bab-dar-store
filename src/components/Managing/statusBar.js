import React from 'react'
import { HiRefresh } from 'react-icons/hi'
import '../../styles/Managing/Managing.css'

export default function StatusBar({setUp,owner,closeStore,openStore,logOut,...props}) {
  return (
    <div id='status-bar' >
        <h1 id='revenue-title'>Revenue</h1>
        <p id='revenue' >{owner.revenue} DH</p>
        <h1 style={{color:owner.storeActive?"green":"red"}} >{owner.storeActive?'Open':'Closed'}</h1>
        <button onClick={()=>owner.storeActive?closeStore():openStore()} >{owner.storeActive?'Close':'Open'}</button>        
        <div id='refresh-btn' onClick={setUp} ><HiRefresh size={40} /></div>
        <button style={{backgroundColor:'red'}} onClick={logOut} >Log out</button>
    </div>
  )
}
