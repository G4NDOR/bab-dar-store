
import logo from './logo.svg';
import './App.css';
import Managing from './screens/Managing';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './screens/Orders';
import { firebase } from './firebase'
import { setAppUser } from './redux/ducks/User';
import { setSelectedPage } from './redux/ducks/appVars';
import { useEffect } from 'react';

function App() {

    const dispatch = useDispatch()
    const selectedPage = useSelector(state => state.appVars.selectedPage)

    function handleSignOut() {
        firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // User is signed out
            dispatch(setSelectedPage('Managing'))
            dispatch(setAppUser(undefined))
        }
        });
    }

    useEffect(() => {
        handleSignOut()
    }, [])
        

    return selectedPage === 'Managing'?
    <Managing/>:
    <Orders/>
}

export default App;

