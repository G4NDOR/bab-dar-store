
import { combineReducers, createStore } from "redux";
import ordersManager from "./ducks/ordersManager";
import statusBarManager from "./ducks/statusBarManager";
import appVars from "./ducks/appVars";
import user from "./ducks/User";
import storeItems from "./ducks/storeItems";

const reducer = combineReducers({
    statusBarManager:statusBarManager,
    ordersManager:ordersManager,
    appVars:appVars,
    user:user,
    storeItems:storeItems
})


const store = createStore(reducer)
export default store;    
