
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import '../styles/Managing/Managing.css'
import { DATA_Ref, db, fb } from '../firebase';
import { setNavigation, setSelectedPage } from '../redux/ducks/appVars';
import { setAppUser, setOwner } from '../redux/ducks/User';
import { setItems } from '../redux/ducks/storeItems';
import NavBar from '../components/NavBar';
import Item from '../components/Managing/Item';
import PlusBtn from '../components/Managing/PlusBtn';
import ItemEditing from '../components/Managing/ItemEditing';
import StatusBar from '../components/Managing/statusBar';

export default function Managing() {

    const dispatch = useDispatch()
    const editing = useSelector(state => state.appVars.editing)
    const appUser = useSelector(state => state.user.appUser)
    const owner = useSelector(state => state.user.owner)
    const items = useSelector(state => state.storeItems.items)
    const form = useRef()
    const [email, setEmail] = useState('');
    const [password1, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const type = 'store'

    function refresh(storeName){
        DATA_Ref.where("restaurant", "==", `${storeName}`).get()
        .then( snapshot => dispatch(setItems(snapshot.docs.map( doc => ({ ...doc.data() , id:doc.id })))))
        .catch((error) => {console.log("Error", error)})
    }

    function setUp(uid) {
        var docRef = db.collection('owners').doc(`${uid}`);
        docRef.get().then((doc) => {
        //console.log('ssssss;',doc.data())
        dispatch(setOwner(doc.data()))
        refresh(doc.data().storeName)
        }).catch((error) => {
        console.log("Error getting document:", error);
        });
    }
            
    function Login(e) {
        e.preventDefault()
        fb.auth().signInWithEmailAndPassword(email, password1)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        const UserType = user.displayName
        if (UserType===type){
            //console.log('driver')
            dispatch(setAppUser(user))
            setUp(user.uid)          
            //console.log('navigating now...')
        }else{
            setMsg('not eligeable')
            setTimeout(() => {setMsg(null)}, 2000)
        }
        // ...
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setMsg(errorMessage)
        });   
        setTimeout(() => {
        setMsg('')
        }, 4000); 
    }

    function logOut() {
        fb.auth().signOut().then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }

    function openStore(){
        let docRef1 = db.collection('owners').doc(`${appUser.uid}`)
        let docRef2 = db.collection('stores').doc(`${owner.storeName}`)
        let updates1 = {};
        let updates2 = {};
        updates1['storeActive'] = true
        updates2['open'] = true
        

        docRef1.update(updates1)
        docRef2.update(updates2)
    }

    function closeStore(){
        let docRef1 = db.collection('owners').doc(`${appUser.uid}`)
        let docRef2 = db.collection('stores').doc(`${owner.storeName}`)
        let updates1 = {};
        let updates2 = {};
        updates1['storeActive'] = false
        updates2['open'] = false
        

        docRef1.update(updates1)
        docRef2.update(updates2)
    }

    const Page = <div className='Page' >
        <NavBar/>
        <StatusBar setUp={()=>setUp(appUser.uid)} owner={owner} closeStore={()=>closeStore()} openStore={()=>openStore()} logOut={logOut} />
        <div id='items-wrapper' >
        {
            items.map((item,index)=><Item key={index} item={item} />)
        }
        <PlusBtn/>
        </div>
        {
        editing[0]?
        <ItemEditing/>:
        null
        } 
           
    </div>
                

    return <div id='container' >
        {
        appUser?
        Page:
        <div style={{display:'flex',flexDirection:'column'}}>  
            <p>{msg}</p>
            <form ref={form} onSubmit={(e)=>Login(e)} id='form' >
            <p className='label email-label'>Email:</p>
            <input required={true} className='email' name='email' type={'email'} onChange={txt=>setEmail(txt.target.value.trim())} />
            <p className='label password-label'>Password:</p>
            <input required={true} className='password' name='password' type={'password'} onChange={txt=>setPassword(txt.target.value.trim())} />
            <input className='submit' type={'submit'} value={'Login'}/>
            </form>
        </div>
        }
    </div>
}

